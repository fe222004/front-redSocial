import { HttpClient } from '@angular/common/http';
import { inject, Injectable} from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ResolverI } from '../models/resolver';

@Injectable({providedIn: 'root'})
export class ResolverService {
    
    private apiUrl = 'http://localhost:3000/resolvers';

    private readonly httpClient = inject(HttpClient);
    private API_URL_RESOLVER = `${environment.API_URL}/resolvers`;

    findResolver():Observable<ResolverI[]>{
        console.log("Llego al servidor")
        return this.httpClient.get<ResolverI[]>(this.API_URL_RESOLVER);
    }

    createResolver(playload: ResolverI){
        console.log("Entro al servidor", playload)
        return this.httpClient.post(this.API_URL_RESOLVER, playload);

    }

    //ACTUALIZAR
    updateResolver(id: string, payload: ResolverI): Observable<ResolverI> {
        return this.httpClient.put<ResolverI>(`${this.apiUrl}/${id}`, payload);
      }
      
    findResolverOne(id: string):Observable<ResolverI>{
        return this.httpClient.get<ResolverI>(`${this.API_URL_RESOLVER}/${id}`)
    }
}
