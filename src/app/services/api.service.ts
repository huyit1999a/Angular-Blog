import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  postUser(data: any): Observable<any> {
    return this.http
      .post<any>('http://localhost:3000/users', data, this.httpOptions)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getUser(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/users').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  updateUser(data: any, id: number): Observable<any> {
    return this.http
      .put<any>(`http://localhost:3000/users/${id}`, data, this.httpOptions)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/users/${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  //Posts
  createPost(data: any): Observable<any> {
    return this.http
      .post<any>('http://localhost:3000/posts', data, this.httpOptions)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getPost(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/posts').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getPostDetail(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/posts/${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  updatePost(data: any, id: number): Observable<any> {
    return this.http
      .put<any>(`http://localhost:3000/posts/${id}`, data, this.httpOptions)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/posts/${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  //Comment
  createComment(data: any): Observable<any> {
    return this.http
      .post<any>('http://localhost:3000/comments', data, this.httpOptions)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getAllComments(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/comments').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  updateComment(data: any, id: number): Observable<any> {
    return this.http
      .put<any>(`http://localhost:3000/comments/${id}`, data, this.httpOptions)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  deleteComment(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/comments/${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
