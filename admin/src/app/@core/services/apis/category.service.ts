import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable,catchError, map, throwError } from 'rxjs';

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
  getCategory(): Observable<any> {
    return this._http.get<any>(`${API_BASE_URL}${API_ENDPOINT.category.get}`).pipe(
      map(response => {
        // Kiểm tra phản hồi từ API
        console.log('API Response:', response);

        if (response && response.status === 'success' && response.data) {
          // Trả về dữ liệu danh mục từ phản hồi API
          return response.data;
        } else {
          // Nếu phản hồi không hợp lệ, ném ra một lỗi
          throw new Error('Invalid response from server');
        }
      })
    );
  }
  
  getAllCategory(): Observable<any> {
    return this.get(API_BASE_URL + API_ENDPOINT.category.get);
  }
  createCategory(category: Category): Observable<any> {
    return this.post(API_BASE_URL + API_ENDPOINT.category.create, category);
  }
  updateCategory(category: Category): Observable<any> {
    return this.put(API_BASE_URL + API_ENDPOINT.category.update, category);
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
