import fs from 'fs';
import path from 'path';
import mime from 'mime-types';
import type { Core } from '@strapi/strapi';

const VARIANT_PREFIX_RE = /^(small|medium|large|thumbnail)_(.+)_([a-f0-9]{10})(\.[a-z0-9]+)?$/i;

export interface SyncOptions {
  clean?: boolean;
}

export interface SyncResult {
  total: number;
  originals: number;
  variants: number;
  alreadyRegistered: number;
  imported: number;
  failed: string[];
}

export async function syncMediaLibrary(
  strapi: Core.Strapi,
  options: SyncOptions = {}
): Promise<SyncResult> {
  const uploadsDir = path.join(strapi.dirs.static.public, 'uploads');
  const fileModel = 'plugin::upload.file';

  if (!fs.existsSync(uploadsDir)) {
    strapi.log.warn(`[media-sync] Uploads directory not found: ${uploadsDir}. Skipping sync.`);
    return { total: 0, originals: 0, variants: 0, alreadyRegistered: 0, imported: 0, failed: [] };
  }

  const entries = fs
    .readdirSync(uploadsDir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .filter((entry) => !entry.name.startsWith('.'));

  const originals = entries
    .filter((entry) => !VARIANT_PREFIX_RE.test(entry.name))
    .map((entry) => ({
      name: entry.name,
      base: path.basename(entry.name, path.extname(entry.name)),
      absPath: path.join(uploadsDir, entry.name),
      size: fs.statSync(path.join(uploadsDir, entry.name)).size,
      mimetype: mime.lookup(entry.name) || 'application/octet-stream',
    }));

  const variants = entries.length - originals.length;

  if (originals.length === 0) {
    return { total: entries.length, originals: 0, variants, alreadyRegistered: 0, imported: 0, failed: [] };
  }

  const existing = await strapi.db.query(fileModel).findMany({
    select: ['id', 'name', 'hash', 'url'],
  });

  const existingNames = new Set(existing.map((f) => f.name));
  const existingHashes = new Set(existing.map((f) => f.hash));
  const existingUrls = new Set(existing.map((f) => f.url));

  const pending = originals.filter((orig) => {
    const url = `/uploads/${orig.name}`;
    return (
      !existingNames.has(orig.name) &&
      !existingHashes.has(orig.base) &&
      !existingUrls.has(url)
    );
  });

  const alreadyRegistered = originals.length - pending.length;
  const failed: string[] = [];
  let imported = 0;

  if (pending.length > 0) {
    const uploadService = strapi.plugin('upload').service('upload');

    for (const orig of pending) {
      try {
        const file = {
          originalFilename: orig.name,
          size: orig.size,
          mimetype: orig.mimetype,
          filepath: orig.absPath,
        };

        const created = await uploadService.upload({
          data: { fileInfo: { name: orig.name } },
          files: file,
        });

        for (const record of Array.isArray(created) ? created : [created]) {
          imported += 1;
          strapi.log.info(`[media-sync] Registered: ${record.name} -> ${record.url} (id=${record.id})`);
          if (options.clean) {
            try {
              fs.unlinkSync(orig.absPath);
              strapi.log.info(`[media-sync] Removed source file: ${orig.absPath}`);
            } catch (err) {
              strapi.log.warn(`[media-sync] Could not remove source file ${orig.absPath}: ${(err as Error).message}`);
            }
          }
        }
      } catch (err) {
        failed.push(orig.name);
        strapi.log.error(`[media-sync] Failed to register ${orig.name}: ${(err as Error).message}`);
      }
    }
  }

  strapi.log.info(
    `[media-sync] Found ${entries.length} file(s), ${originals.length} original(s), ${variants} variant(s) skipped, ` +
      `${alreadyRegistered} already registered, ${imported} imported, ${failed.length} failed.`
  );

  return { total: entries.length, originals: originals.length, variants, alreadyRegistered, imported, failed };
}