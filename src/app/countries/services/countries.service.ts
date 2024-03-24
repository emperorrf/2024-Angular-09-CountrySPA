import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl:string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountry: { term: '', countries: [] },
    byRegion:  { region: '', countries: [] }
  }

  constructor( private http: HttpClient) {
    this.loadFromLocalStorage();
    // Como no es un componente lo hago en el constructor, para que se ejecute cuando se inicializa
  }

  private saveToLocalStorage(){
    localStorage.setItem('cacheStorage', JSON.stringify( this.cacheStore));
  }
  private loadFromLocalStorage(){
    if (!localStorage.getItem('cacheStorage')) return;
    this.cacheStore = JSON.parse( localStorage.getItem('cacheStorage')! );
  }

  private getCountryRequest ( url: string ): Observable<Country[]>{
    return this.http.get<Country[]>(url)
    .pipe(
      catchError( (error) => {
        console.error(error.message);
        return of([])
      }),
      // Abreviado: catchError( () => of([]))
      delay(2000)
    );
  }

  searchCountryByCode (code:string): Observable<Country | null>{
    const url = `${this.apiUrl}/alpha/${code}`;
    return this.http.get<Country[]>( url )
      .pipe(
        map ( countries => countries.length>0? countries[0] : null),
        catchError( error => {
          console.error(error.message);
          return of(null)
        })
      )
  }

  searchCapital (term:string): Observable<Country[]>{
    const url = `${this.apiUrl}/capital/${term}`;
    return this.getCountryRequest(url)
      .pipe(
        tap ( countries => this.cacheStore.byCapital = {term, countries} ),
        tap ( ()=> this.saveToLocalStorage() )
      )
  }

  searchCountry (term: string): Observable<Country[]>{
    const url = `${this.apiUrl}/name/${term}`;
    return this.getCountryRequest(url)
    .pipe(
      tap ( countries => this.cacheStore.byCountry = {term, countries} ),
      tap ( ()=> this.saveToLocalStorage() )
    )

  }
  searchRegion (region: Region): Observable<Country[]>{
    const url = `${this.apiUrl}/region/${region}`;
    return this.getCountryRequest(url)
    .pipe(
      tap ( countries => this.cacheStore.byRegion = {region, countries} ),
      tap ( ()=> this.saveToLocalStorage() )
    )
  }
}
