import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ProductModel } from '../../model/product.model';
import { API_BASE_URL, API_ENDPOINT } from '../../config/api-endpoint.config';
import { Product } from 'app/pages/entities/product';
import { ApiService } from '../common';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends ApiService{

  constructor(private _http: HttpClient) {
    super(_http);
  }
  getAllProducts(): Observable<any> {
    return this.get(API_BASE_URL + API_ENDPOINT.product.get);
  }

  createProduct(products: Product): Observable<any> {
    return this.post(API_BASE_URL + API_ENDPOINT.product.create, products)
  }

  updateProduct(product: Product): Observable<any> {
    return this.put(API_BASE_URL + API_ENDPOINT.product.update, )
  }

  deleteProduct(productId: number): Observable<any> {
    const deleteURL = `${API_BASE_URL}${API_ENDPOINT.product.delete}/${productId}`;
    console.log(deleteURL);

    return this.delete(deleteURL).pipe(
      catchError((error) => {
        console.error('Error occurred while deleting product:', error);
        return throwError(error);
      })
    )
  }
}
