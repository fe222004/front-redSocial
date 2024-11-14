import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl: string = 'http://localhost:3000/country';
  
  constructor() { }

  findCountries():Observable<Country[]> {
    return this.httpClient.get<[]>(this.apiUrl);
  }
}
