// Data loader — reads cities-seed.json and per-city firm JSONs
import type { State, City, CityFirmsData, Firm, SeedData } from './types';
import seedData from '../data/cities-seed.json';

const data = seedData as SeedData;

/** Get all 50 states with their cities */
export function getAllStates(): State[] {
  return data.states;
}

/** Get a single state by slug */
export function getState(slug: string): State | undefined {
  return data.states.find(s => s.slug === slug);
}

/** Get all cities for a given state slug */
export function getCitiesForState(stateSlug: string): City[] {
  const state = getState(stateSlug);
  return state?.cities ?? [];
}

/** Load firms for a specific city. Returns empty data if file missing */
export function getFirmsForCity(stateSlug: string, citySlug: string): CityFirmsData {
  try {
    // Use import.meta.glob to load firm files at build time
    const firmFiles = import.meta.glob('../data/firms-by-city/**/*.json', { eager: true });
    const key = `../data/firms-by-city/${stateSlug}/${citySlug}.json`;
    const file = firmFiles[key] as { default?: CityFirmsData } | CityFirmsData | undefined;
    if (file) {
      const d = ('default' in file ? file.default : file) as CityFirmsData;
      return d;
    }
  } catch {
    // File doesn't exist, return empty
  }
  const state = getState(stateSlug);
  return {
    city: citySlug,
    state: state?.name ?? stateSlug,
    state_code: state?.code ?? '',
    city_slug: citySlug,
    state_slug: stateSlug,
    firm_count: 0,
    firms: [],
  };
}

/** Get a single firm by slug */
export function getFirm(stateSlug: string, citySlug: string, firmSlug: string): Firm | undefined {
  const cityData = getFirmsForCity(stateSlug, citySlug);
  return cityData.firms.find(f => f.slug === firmSlug);
}

/** Get total firm count across all cities */
export function getTotalFirmCount(): number {
  let count = 0;
  for (const state of data.states) {
    for (const city of state.cities) {
      const cityData = getFirmsForCity(state.slug, city.slug);
      count += cityData.firm_count;
    }
  }
  return count;
}

/** Top 10 cities for homepage — hardcoded as specified */
export function getTopCities(): Array<{ city: string; state: string; stateSlug: string; citySlug: string }> {
  return [
    { city: 'New York', state: 'New York', stateSlug: 'new-york', citySlug: 'new-york' },
    { city: 'Los Angeles', state: 'California', stateSlug: 'california', citySlug: 'los-angeles' },
    { city: 'Chicago', state: 'Illinois', stateSlug: 'illinois', citySlug: 'chicago' },
    { city: 'Houston', state: 'Texas', stateSlug: 'texas', citySlug: 'houston' },
    { city: 'Phoenix', state: 'Arizona', stateSlug: 'arizona', citySlug: 'phoenix' },
    { city: 'Philadelphia', state: 'Pennsylvania', stateSlug: 'pennsylvania', citySlug: 'philadelphia' },
    { city: 'San Antonio', state: 'Texas', stateSlug: 'texas', citySlug: 'san-antonio' },
    { city: 'San Diego', state: 'California', stateSlug: 'california', citySlug: 'san-diego' },
    { city: 'Dallas', state: 'Texas', stateSlug: 'texas', citySlug: 'dallas' },
    { city: 'Austin', state: 'Texas', stateSlug: 'texas', citySlug: 'austin' },
  ];
}
