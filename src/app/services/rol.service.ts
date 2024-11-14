import { Injectable, inject } from '@angular/core';
import { Rol } from '../models/rol';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl: string = 'http://localhost:3000/rol';
  
  constructor() { }

  findRol():Observable<Rol[]> {
    return this.httpClient.get<[]>(this.apiUrl);
  }
}
