/**
 * import-firms.mjs
 * Reads raw scraped JSON from drive-download folder, transforms each firm into
 * the lean Firm shape expected by the Astro templates, and writes them to
 * src/data/firms-by-city/{state}/{city}.json
 *
 * Also replaces src/data/cities-seed.json with the downloaded version that has
 * real Census population data.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, copyFileSync } from 'fs';
import { join } from 'path';

const RAW_DIR = 'drive-download-20260422T074030Z-3-001/raw';
const OUT_DIR = 'src/data/firms-by-city';
const SEED_SRC = 'drive-download-20260422T074030Z-3-001/cities-seed.json';
const SEED_DST = 'src/data/cities-seed.json';

// ─── Helpers ──────────────────────────────────────────
function slugify(name) {
  return name
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/&/g, 'and')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Flatten working_hours arrays → single string per day */
function flattenHours(wh) {
  if (!wh) return { Monday: 'Closed', Tuesday: 'Closed', Wednesday: 'Closed', Thursday: 'Closed', Friday: 'Closed', Saturday: 'Closed', Sunday: 'Closed' };
  const out = {};
  for (const [day, val] of Object.entries(wh)) {
    out[day] = Array.isArray(val) ? val.join(', ') : String(val);
  }
  return out;
}

/** Ensure reviews_per_score has all 5 keys */
function normalizeRPS(rps) {
  const defaults = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 };
  if (!rps) return defaults;
  return { ...defaults, ...rps };
}

/** Transform a raw firm object into lean Firm format */
function transformFirm(raw) {
  const slug = slugify(raw.name || 'unnamed');
  return {
    slug,
    name: raw.name || '',
    category: raw.category || raw.type || '',
    phone: raw.phone || '',
    site: raw.website || '',
    address: raw.address || '',
    latitude: raw.latitude || 0,
    longitude: raw.longitude || 0,
    rating: raw.rating || 0,
    reviews: raw.reviews || 0,
    logo: raw.logo || '',
    photo: raw.photo || '',
    working_hours: flattenHours(raw.working_hours),
    reviews_per_score: normalizeRPS(raw.reviews_per_score),
    business_status: raw.business_status || 'OPERATIONAL',
    is_verified: raw.verified === true,
    is_claimed: raw.verified === true, // Google verified ≈ claimed
  };
}

// ─── Main ─────────────────────────────────────────────
let totalStates = 0;
let totalCities = 0;
let totalFirms = 0;

const statesDirs = readdirSync(RAW_DIR).filter(f => !f.startsWith('.'));

for (const stateDir of statesDirs) {
  const statePath = join(RAW_DIR, stateDir);
  const outStatePath = join(OUT_DIR, stateDir);
  mkdirSync(outStatePath, { recursive: true });

  const cityFiles = readdirSync(statePath).filter(f => f.endsWith('.json'));
  totalStates++;

  for (const cityFile of cityFiles) {
    const raw = JSON.parse(readFileSync(join(statePath, cityFile), 'utf-8'));

    // Transform firms, deduplicate by slug
    const seen = new Set();
    const firms = [];
    for (const rawFirm of (raw.firms || [])) {
      const firm = transformFirm(rawFirm);
      if (!seen.has(firm.slug) && firm.name) {
        seen.add(firm.slug);
        firms.push(firm);
      }
    }

    const output = {
      city: raw.city || raw._source_city_name || '',
      state: raw.state || raw._source_state_name || '',
      state_code: raw.state_code || raw._source_state_code || '',
      city_slug: raw.city_slug || raw._source_city_slug || '',
      state_slug: raw.state_slug || raw._source_state_slug || stateDir,
      firm_count: firms.length,
      firms,
    };

    writeFileSync(join(outStatePath, cityFile), JSON.stringify(output, null, 2));
    totalCities++;
    totalFirms += firms.length;
  }
}

console.log(`✅ Imported ${totalFirms} firms across ${totalCities} cities in ${totalStates} states`);

// ─── Replace cities-seed.json ────────────────────────
if (existsSync(SEED_SRC)) {
  copyFileSync(SEED_SRC, SEED_DST);
  console.log('✅ Replaced cities-seed.json with downloaded Census data');
} else {
  console.warn('⚠️  Downloaded cities-seed.json not found at', SEED_SRC);
}

console.log('\nDone! Now run: npm run build');
