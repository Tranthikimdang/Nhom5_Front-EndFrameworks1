// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// import { Observable, catchError, throwError } from 'rxjs';

// import { ApiService } from '../common';
// import { OrderModel } from '../../model/order.model';
// import { API_BASE_URL, API_ENDPOINT } from '../../config/api-endpoint.config';
// import { Order } from 'app/pages/entities/order';

// @Injectable({
//   providedIn: 'root',
// })

// export class OrderService extends ApiService {
//   constructor(private _http: HttpClient) {
//     super(_http);
//   }
//   getAllOrder(): Observable<any> {
//     return this._http.get<any>(`${API_BASE_URL}${API_ENDPOINT.order.get}`);
//   }
//   createOrder(order: Order): Observable<any> {
//     return this._http.post<any>(`${API_BASE_URL}${API_ENDPOINT.order.create}`, order);
//   }
//   updateOrder(order: Order): Observable<any> {
//     return this._http.put<any>(`${API_BASE_URL}${API_ENDPOINT.order.update}`, order);
//   }
//   deleteOrder(id: string): Observable<any> {
//     const deleteUrl = `${API_BASE_URL}${API_ENDPOINT.order.delete}/${id}`;
//     console.log(deleteUrl); // Log URL để debug
//     return this.delete(deleteUrl).pipe(
//       catchError((error) => {
//         console.error('Error occurred while deleting comment:', error); // Log lỗi để debug
//         return throwError(error);
//       })
//     );
//   }
// }
