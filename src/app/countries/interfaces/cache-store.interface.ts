import { Country } from "./country.interface";
import { Region } from "./region.type";

export interface CacheStore {
  byCapital: TermCapital;
  byCountry: TermCountry;
  byRegion: RegionCountries;
}
export interface TermCapital {
  term: string;
  countries: Country[];
}
export interface TermCountry {
  term: string;
  countries: Country[];
}
export interface RegionCountries {
  region: Region;
  countries: Country[];
}
