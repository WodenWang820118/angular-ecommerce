import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

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
}
