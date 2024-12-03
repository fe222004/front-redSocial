
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl: string = 'http://localhost:3000/users';
  private readonly apiImage: string = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  getUser(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/${id}`).pipe(
      map((user: User) => ({
        ...user,
        image: `${this.apiImage}/uploads/${user.avatar}`, // Construir la URL completa de la imagen del usuario
      })),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred!';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          if (error.status === 404 && error.error.message.includes('User not found')) {
            errorMessage = 'User not found.';
          } else {
            errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
          }
        }
        console.error(errorMessage);
        return throwError(errorMessage);
      })
    );
  }

  updateUser(id: string, formData: FormData): Observable<any> {
    return this.httpClient.put<any>(`${this.apiUrl}/${id}`, formData).pipe(
      map((user: User) => ({
        ...user,
        image: `${this.apiImage}/uploads/${user.avatar}`, // Construir la URL completa de la imagen del usuario
      })),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      if (error.status === 400 && error.error.message.includes('User already exists')) {
        errorMessage = 'A user with this email already exists.';
      } else {
        errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
      }
    }
    return throwError(errorMessage);
  }
}
