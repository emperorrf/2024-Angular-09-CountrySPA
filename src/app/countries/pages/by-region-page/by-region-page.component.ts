import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit{

  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;

  public countries: Country[] = [];
  public isLoading: boolean = false;

  constructor ( private countriesService: CountriesService){}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }

  searchByRegion( region: Region): void {
    if ( region.length === 0) return;
    this.selectedRegion = region;
    this.isLoading = true;
    console.log('Desde region page', region);
    this.countriesService.searchRegion(region).subscribe( countries => {
      this.countries = countries
      this.isLoading = false;
    })
  }

}
