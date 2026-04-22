// SEO helpers — meta tag builders, JSON-LD generators
import { absoluteUrl } from './urls';
import type { Firm, CityFirmsData } from './types';

const SITE_NAME = 'Best CPA Near Me';

/** Build Organization + WebSite JSON-LD for homepage */
export function homeSchemaOrg(): string {
  const org = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: 'https://bestcpanearme.com/',
    logo: 'https://bestcpanearme.com/favicon.svg',
    description: 'Find the best Certified Public Accountants near you across all 50 US states.',
    sameAs: [],
  };
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: 'https://bestcpanearme.com/',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://bestcpanearme.com/find-cpa/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
  return JSON.stringify([org, website]);
}

/** Build BreadcrumbList JSON-LD */
export function breadcrumbSchemaOrg(items: Array<{ name: string; url: string }>): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return JSON.stringify(schema);
}

/** Build ItemList JSON-LD for city page (list of firms) */
export function cityItemListSchemaOrg(firms: Firm[], stateSlug: string, citySlug: string): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: firms.map((firm, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: firm.name,
      url: absoluteUrl(`/${stateSlug}/${citySlug}/${firm.slug}/`),
    })),
  };
  return JSON.stringify(schema);
}

/** Build LocalBusiness + AccountingService + AggregateRating JSON-LD for firm page */
export function firmSchemaOrg(firm: Firm, cityName: string, stateName: string, stateSlug: string, citySlug: string): string {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['AccountingService', 'LocalBusiness'],
    name: firm.name,
    url: absoluteUrl(`/${stateSlug}/${citySlug}/${firm.slug}/`),
    telephone: firm.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: firm.address,
      addressLocality: cityName,
      addressRegion: stateName,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: firm.latitude,
      longitude: firm.longitude,
    },
    image: firm.photo || firm.logo,
  };
  if (firm.reviews > 0) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: firm.rating,
      reviewCount: firm.reviews,
      bestRating: 5,
      worstRating: 1,
    };
  }
  return JSON.stringify(schema);
}
