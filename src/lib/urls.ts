// URL builder helpers for consistent link generation

const SITE = 'https://bestcpanearme.com';

export function stateUrl(stateSlug: string): string {
  return `/${stateSlug}/`;
}

export function cityUrl(stateSlug: string, citySlug: string): string {
  return `/${stateSlug}/${citySlug}/`;
}

export function firmUrl(stateSlug: string, citySlug: string, firmSlug: string): string {
  return `/${stateSlug}/${citySlug}/${firmSlug}/`;
}

export function absoluteUrl(path: string): string {
  return `${SITE}${path}`;
}

export function directionsUrl(address: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
}
