import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, throwError } from 'rxjs';

import { ApiService } from '../common';
import { CommentModel } from '../../model/comment.model';
import { API_BASE_URL, API_ENDPOINT } from '../../config/api-endpoint.config';
import { Icomments } from 'app/pages/entities/comments';

@Injectable({
  providedIn: 'root',
})
export class CommentService extends ApiService {
  constructor(private _http: HttpClient) {
    super(_http);
  }
  getAllComment(): Observable<any> {
    return this.get(API_BASE_URL + API_ENDPOINT.comment.get);
  }
  createComment(comment: Icomments): Observable<any> {
    return this.post(API_BASE_URL + API_ENDPOINT.comment.create, comment);
  }
  updateCommennt(comment: Icomments): Observable<any> {
    return this.put(API_BASE_URL + API_ENDPOINT.comment.update, comment);
  }
  deleteComment(id: string): Observable<any> {
    const deleteUrl = `${API_BASE_URL}${API_ENDPOINT.comment.delete}/${id}`;
    console.log(deleteUrl); // Log URL để debug

    return this.delete(deleteUrl).pipe(
      catchError((error) => {
        console.error('Error occurred while deleting comment:', error); // Log lỗi để debug
        return throwError(error);
      })
    );
  }
}
