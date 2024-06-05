import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable,catchError, throwError } from 'rxjs';

import {ApiService} from "../common";
import {API_BASE_URL,API_ENDPOINT} from "../../config/api-endpoint.config";
import { User } from 'app/pages/entities/user';

@Injectable({
  providedIn: 'root',
})
export class UserService extends ApiService {

  constructor(private _http: HttpClient) {
    super(_http);
  }
  getAllUser(): Observable<any> {
    return this.get(API_BASE_URL + API_ENDPOINT.user.get);
  }
  createUser(user: User): Observable<any> {
    return this.post(API_BASE_URL + API_ENDPOINT.user.create, user);
  }
  updateUser(user: User): Observable<any> {
    const updateUrl = `${API_BASE_URL}${API_ENDPOINT.user.update}/${user.userId}`;
    return this.put(updateUrl, user);
  }
  deleteUser(id: string): Observable<any> {
    const deleteUrl = `${API_BASE_URL}${API_ENDPOINT.user.delete}/${id}`;
    console.log(deleteUrl); // Log URL để debug

    return this.delete(deleteUrl).pipe(
      catchError((error) => {
        console.error('Error occurred while deleting user:', error); // Log lỗi để debug
        return throwError(error);
      })
    );
  }
}
