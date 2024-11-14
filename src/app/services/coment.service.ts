import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import { ComentI } from "../models/coment.interface";
import { environment } from "../../environments/environment";


@Injectable({providedIn: 'root'})
export class ComentService {
  private readonly httpClient = inject(HttpClient);

  private readonly apiUrl: string = 'http://localhost:3000/coments';

  findComentS():Observable<ComentI[]> {
    return this.httpClient.get<[]>(this.apiUrl);
  }

  createComent(payload: ComentI) {
    return this.httpClient.post(this.apiUrl, payload);
  }

  updateComent(id: string, payload: ComentI):Observable<ComentI> {
    return this.httpClient.put<ComentI>(`${this.apiUrl}/${id}`, payload);
  }

  deleteComent(id: string) {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);

  }

  findComentOne(id: string):Observable<ComentI> {
    return this.httpClient.get<ComentI>(`${this.apiUrl}/${id}`);
  }


  //comentarios modal

  private modalVisibility = new Subject<boolean>();

  modalVisibility$ = this.modalVisibility.asObservable();

  showModal() {
    this.modalVisibility.next(true);
  }

  hideModal() {
    this.modalVisibility.next(false);
  }


}