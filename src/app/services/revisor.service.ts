import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Complaint } from '../models/Complaint';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RevisorService {
private readonly httpClient = inject(HttpClient);
private API_URL_REVISOR =`${environment.API_URL}/revisor`;

getAll():Observable<Complaint[]>{
  return this.httpClient.get<Complaint[]>(this.API_URL_REVISOR)
}

createForm(payload:Complaint){
return this.httpClient.post(this.API_URL_REVISOR,payload)
}
}
