import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit{

  public country?: Country;

  constructor( private activatedRoute: ActivatedRoute,
               private countriesService: CountriesService,
               private router: Router){}

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.countriesService.searchCountryByCode(id))
    )
    .subscribe( country => {
      if(!country) return this.router.navigateByUrl('countries/by-region');
      return this.country = country;
    } )
  }

  // ngOnInit(): void {
  //   this.activatedRoute.params.subscribe(
  //     //(params) => console.log({params: params['id']})
  //     ({id}) => {
  //       this.countriesService.searchCountryByCode(id).subscribe(
  //         country => {
  //           this.countries=country;
  //           console.log(this.countries); })})}
}
