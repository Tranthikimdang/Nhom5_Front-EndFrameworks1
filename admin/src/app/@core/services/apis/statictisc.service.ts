import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ProductModel } from '../../model/product.model';
import { API_BASE_URL, API_ENDPOINT } from '../../config/api-endpoint.config';
import { Product } from 'app/pages/entities/product';
import { ApiService } from '../common';

@Injectable({
  providedIn: 'root',
})
export class StatictiscService extends ApiService{


  searchProductsByName(name: string) {
    throw new Error('Method not implemented.');
  }
  constructor(private _http: HttpClient) {
    super(_http);
  }

  getProductsByPage(page: number, pageSize: number): Observable<any> {
    return this._http
      .get<any>(`${API_BASE_URL}/products?page=${page}&pageSize=${pageSize}`)
      .pipe(catchError(this.handleError));
  }


  getProductsByCategory(cateId: number): Observable<any> {
    return this._http
      .get<any>(`${API_BASE_URL}/products/category/${cateId}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      // Xử lý lỗi ở phía máy khách hoặc mạng
      console.error('An error occurred:', error.error.message);
    } else {
      // Xử lý lỗi trả về từ API
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // Trả về một observable với một thông điệp lỗi
    return throwError('Something bad happened; please try again later.');
  }

  getAllProducts(): Observable<any> {
    // let params = new HttpParams()
    // .set('page', page.toString())
    // .set('pageSize', pageSize.toString())
    // if(filter){
    //   params = params.set('filter', filter)
    // }
    return this.get(API_BASE_URL + API_ENDPOINT.product.get);
  }

 
}
