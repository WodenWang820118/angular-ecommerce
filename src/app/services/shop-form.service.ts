import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Country } from 'country-state-city';
import { getStatesOfCountry } from 'country-state-city/dist/lib/state';

@Injectable({
  providedIn: 'root'
})
export class ShopFormService {

  constructor() { }

  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let months: number[] = [];
    for (let month = startMonth; month <= 12; month++) {
      months.push(month);
    }
    return of(months);
  }

  getCreditCardYears(): Observable<number[]> {
    let years: number[] = [];
    let currentYear = new Date().getFullYear();
    for (let year = new Date().getFullYear(); year <= currentYear + 10; year++) {
      years.push(year);
    }
    return of(years);
  }

  getCountries(): Observable<{countryName: string, isoCode: string}[]> {
    const countries: {
      countryName: string,
      isoCode: string
    } [] = [];

    for (let country of Country.getAllCountries()) {
      countries.push({
        countryName: country.name,
        isoCode: country.isoCode
      });
    }
    return of(countries);
  }

  getStates(countryCode: string): Observable<string[]> {
    const states: string[] = [];
    for (let state of getStatesOfCountry(countryCode)) {
      states.push(state.name);
    }
    return of(states);
  }
}
