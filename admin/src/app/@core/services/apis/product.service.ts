import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ProductModel } from '../../model/product.model';
import { API_BASE_URL, API_ENDPOINT } from '../../config/api-endpoint.config';
import { Product } from 'app/pages/entities/product';
import { ApiService } from '../common';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends ApiService {
  constructor(private _http: HttpClient) {
    super(_http);
  }

  getProductsByPage(page: number, pageSize: number): Observable<any> {
    return this._http
      .get<any>(`${API_BASE_URL}/products?page=${page}&pageSize=${pageSize}`)
      .pipe(catchError(this.handleError));
  }

  // getProductsByCategory(cateId: number): Observable<any> {

  //   return this._http.get<any>(
  //     `${API_BASE_URL}/products/category/${cateId}`
  //   );
  // }

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
  console.log(API_BASE_URL);
      
    return this.get(API_BASE_URL + API_ENDPOINT.product.get);
  }

  createProduct(products: Product): Observable<any> {
    return this.post(API_BASE_URL + API_ENDPOINT.product.create, products);
  }

  updateProduct(product: Product): Observable<any> {
    return this.put(API_BASE_URL + API_ENDPOINT.product.update);
  }

  deleteProduct(productId: number): Observable<any> {
    const deleteURL = `${API_BASE_URL}${API_ENDPOINT.product.delete}/${productId}`;
    console.log(deleteURL);

    return this.delete(deleteURL).pipe(
      catchError((error) => {
        console.error('Error occurred while deleting product:', error);
        return throwError(error);
      })
    );
  }

  getProductById(productId: string): Observable<Product> {
    const url = `${API_BASE_URL}${API_ENDPOINT.product.get}/${productId}`;
    return this._http.get<Product>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }

  // handleError(error: HttpErrorResponse): Observable<never> {
  //   let errorMessage = 'Unknown error!';
  //   if (error.error instanceof ErrorEvent) {
  //     // Client-side errors
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     // Server-side errors
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   console.error(errorMessage);
  //   return throwError(errorMessage);
  // }
}
