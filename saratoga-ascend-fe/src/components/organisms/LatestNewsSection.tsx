import React from 'react';
import { Container, Heading } from '../atoms';
import { LatestNewsCard, type LatestNewsCardProps } from '../molecules/LatestNewsCard';
import { LatestNewsCarousel } from '../molecules/LatestNewsCarousel';
import { strapiUrl, strapiToken } from '@/lib/api/config';

export interface LatestNewsSectionProps {
  title?: string;
  subTitle?: string;
  blogs?: any;
  news?: any;
}

export const LatestNewsSection = async ({
  title = 'Latest news and insights',
  subTitle = 'Success is built on consistent effort.',
  blogs = [],
  news = [],
}: LatestNewsSectionProps) => {
  let displayBlogs = Array.isArray(blogs) ? blogs : (blogs?.data || []);
  let displayNews = Array.isArray(news) ? news : (news?.data || []);

  // Default Fallback
  if (displayBlogs.length === 0 && displayNews.length === 0) {
    try {
      const headers: HeadersInit = {};
      if (strapiToken) {
        headers['Authorization'] = `Bearer ${strapiToken}`;
      }

      const [blogsRes, newsRes] = await Promise.all([
        fetch(`${strapiUrl}/api/blogs?populate=*&sort=createdAt:desc&pagination[limit]=2`, { 
          next: { revalidate: 60 },
          headers 
        }),
        fetch(`${strapiUrl}/api/news-articles?populate=*&sort=createdAt:desc&pagination[limit]=1`, { 
          next: { revalidate: 60 },
          headers 
        })
      ]);
      const blogsData = await blogsRes.json();
      const newsData = await newsRes.json();
      
      displayBlogs = blogsData.data || [];
      displayNews = newsData.data || [];
    } catch (e) {
      console.error('Failed to fetch default insights', e);
    }
  } else {
    // Exact rules: 2 Blogs 1 News, or 2 News 1 Blog
    if (displayBlogs.length >= 2 && displayNews.length >= 1) {
      displayBlogs = displayBlogs.slice(0, 2);
      displayNews = displayNews.slice(0, 1);
    } else if (displayNews.length >= 2 && displayBlogs.length >= 1) {
      displayNews = displayNews.slice(0, 2);
      displayBlogs = displayBlogs.slice(0, 1);
    }
  }

  // Combine both arrays
  const combinedItems = [...displayBlogs, ...displayNews].slice(0, 3);

  // Map to LatestNewsCardProps
  const ARTICLES: LatestNewsCardProps[] = combinedItems.map(item => {
    let dateStr = 'Date not set';
    if (item.articleDate) {
      dateStr = new Date(item.articleDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } else if (item.publishedAt) {
      dateStr = new Date(item.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }

    const readTime = item.readTime ? `${item.readTime} min read` : '5 min read';
    
    let imageUrl = '/images/placeholder.png';
    if (item.image?.url) {
      imageUrl = item.image.url.startsWith('http') ? item.image.url : `${strapiUrl}${item.image.url}`;
    }
    
    return {
      title: item.title || 'Untitled',
      meta: `${readTime} · ${dateStr}`,
      href: item.slug ? `/${item.slug}` : '/newsroom',
      imageSrc: imageUrl,
      badge: item.categoryType || 'Blog',
    };
  });

  return (
    <section
      aria-labelledby="latest-news-heading"
      className="bg-latest-news relative overflow-hidden"
    >
      {/* Desktop padding/gaps from Figma 2243:3792 — 40px top, 40px header→cards, ~80px bottom */}
      <Container className="pt-10 pb-20 max-xl:px-5! max-xl:py-10 md:px-8 md:py-12">
        <div className="flex flex-col items-start gap-3">
          <Heading
            id="latest-news-heading"
            level={2}
            size="section"
            tone="onDark"
            className="text-left text-[clamp(32px,4vw,72px)] leading-[1.2] font-normal text-white"
          >
            {title}
          </Heading>
          {subTitle && (
            <p className="font-sans text-left text-[clamp(16px,1.8vw,30px)] leading-5 text-white md:leading-7 xl:leading-[40px]">
              {subTitle}
            </p>
          )}
        </div>

        <div className="mt-10 hidden gap-grid xl:grid xl:grid-cols-3">
          {ARTICLES.map((article, idx) => (
            <LatestNewsCard key={`${article.title}-${idx}`} {...article} />
          ))}
        </div>

        <LatestNewsCarousel articles={ARTICLES} />
      </Container>
    </section>
  );
};
