import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import { EditI } from "../models/edit.interface";

@Injectable({providedIn: 'root'})
export class EditService {
  private readonly httpClient = inject(HttpClient);
  private API_URL_EDIT = `${environment.API_URL}/users`;

  findUsersEdit():Observable<EditI[]> {
    return this.httpClient.get<EditI[]>(this.API_URL_EDIT);
  }
  updateEDIT(id: string, payload: EditI):Observable<EditI> {
    return this.httpClient.put<EditI>(`${this.API_URL_EDIT}/${id}`, payload);
  }

  deleteEDIT(id: string) {
    return this.httpClient.delete(`${this.API_URL_EDIT}/${id}`);
  }
}