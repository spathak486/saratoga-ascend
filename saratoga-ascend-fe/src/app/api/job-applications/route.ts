import { NextResponse } from 'next/server';
import { strapiUrl, strapiToken } from '@/lib/api/config';

export const runtime = 'nodejs';

/**
 * Handles multipart/form-data job application submissions, uploads the resume
 * to Strapi media library if provided, and creates a Job Application record in CMS.
 */
export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const firstName = formData.get('firstName')?.toString() || '';
    const lastName = formData.get('lastName')?.toString() || '';
    const email = formData.get('email')?.toString() || '';
    const phone = formData.get('phone')?.toString() || '';
    const careerArea = formData.get('careerArea')?.toString() || '';
    const preferredLocation = formData.get('preferredLocation')?.toString() || '';
    const employmentPreference = formData.get('employmentPreference')?.toString() || '';
    const jobTitle = formData.get('jobTitle')?.toString() || '';
    const jobSlug = formData.get('jobSlug')?.toString() || '';
    const resumeFile = formData.get('resume') as File | null;

    if (!firstName || !email) {
      return NextResponse.json(
        { error: 'First name and email are required.' },
        { status: 400 }
      );
    }

    let resumeMediaId: number | null = null;

    // 1. Upload resume to Strapi Media Library if attached
    if (resumeFile && resumeFile.size > 0 && strapiUrl && strapiToken) {
      try {
        const uploadFormData = new FormData();
        uploadFormData.append('files', resumeFile, resumeFile.name);

        const uploadRes = await fetch(`${strapiUrl}/api/upload`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${strapiToken}`,
          },
          body: uploadFormData,
        });

        if (uploadRes.ok) {
          const uploadedFiles = await uploadRes.json();
          if (Array.isArray(uploadedFiles) && uploadedFiles.length > 0) {
            resumeMediaId = uploadedFiles[0].id;
          }
        } else {
          console.error('[JobApplication] File upload to CMS returned:', uploadRes.status);
        }
      } catch (uploadErr) {
        console.error('[JobApplication] Resume upload error:', uploadErr);
      }
    }

    // 2. Create the Job Application in Strapi
    if (strapiUrl && strapiToken) {
      const payload: Record<string, unknown> = {
        firstName,
        lastName,
        email,
        phone,
        careerArea,
        preferredLocation,
        employmentPreference,
        jobTitle,
        jobSlug,
        status: 'New',
      };

      if (resumeMediaId) {
        payload.resume = resumeMediaId;
      }

      // First attempt: try job-applications collection
      let createRes = await fetch(`${strapiUrl}/api/job-applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${strapiToken}`,
        },
        body: JSON.stringify({ data: payload }),
      });

      // Fallback: If job-applications is not deployed on remote CMS yet,
      // save into contact-submissions collection so no lead/applicant is lost!
      if (!createRes.ok && createRes.status === 404) {
        const fallbackPayload = {
          firstName,
          lastName,
          email,
          phone,
          organization: `${careerArea} | ${preferredLocation} | ${employmentPreference}`,
          inquiryType: 'Workforce Solutions',
          description: `Applied for Job: ${jobTitle} (${jobSlug}). Phone: ${phone}. Preferences: ${employmentPreference}, ${preferredLocation}.`,
          source: 'JobApplicationForm',
        };

        createRes = await fetch(`${strapiUrl}/api/contact-submissions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${strapiToken}`,
          },
          body: JSON.stringify({ data: fallbackPayload }),
        });
      }

      if (!createRes.ok) {
        const errText = await createRes.text();
        console.error('[JobApplication] Strapi creation failed:', createRes.status, errText);
        return NextResponse.json(
          { error: 'Could not store application in CMS.' },
          { status: 500 }
        );
      }

      const resultData = await createRes.json();
      return NextResponse.json({ success: true, data: resultData.data });
    }

    // Fallback if token or url is absent in dev
    return NextResponse.json({ success: true, simulated: true });
  } catch (error) {
    console.error('[JobApplication] API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing application.' },
      { status: 500 }
    );
  }
}

