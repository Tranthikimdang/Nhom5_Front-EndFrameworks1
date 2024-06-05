import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable,catchError, throwError } from 'rxjs';

import {ApiService} from "../common";
import {API_BASE_URL,API_ENDPOINT} from "../../config/api-endpoint.config";
import { Category } from 'app/pages/entities/categories';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends ApiService {

  constructor(private _http: HttpClient) {
    super(_http);
  }
  getAllCategory(): Observable<any> {
    return this.get(API_BASE_URL + API_ENDPOINT.category.get);
  }
  createCategory(category: Category): Observable<any> {
    return this.post(API_BASE_URL + API_ENDPOINT.category.create, category);
  }
  updateCategory(category: Category): Observable<any> {
    const updateUrl = `${API_BASE_URL}${API_ENDPOINT.category.update}/${category.cateId}`;
    return this.put(updateUrl, category);
  }
  deleteCategory(id: string): Observable<any> {
    const deleteUrl = `${API_BASE_URL}${API_ENDPOINT.category.delete}/${id}`;
    console.log(deleteUrl); // Log URL để debug

    return this.delete(deleteUrl).pipe(
      catchError((error) => {
        console.error('Error occurred while deleting Category:', error); // Log lỗi để debug
        return throwError(error);
      })
    );
  }
}
