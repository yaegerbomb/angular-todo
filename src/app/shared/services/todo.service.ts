import { ToDo } from '../models/todo.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InterceptorHttpParams } from '../interceptors/interceptor-http-params';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  root = 'http://localhost:8080/api/todos';

  constructor(private http: HttpClient) { }

  getTodos() : Observable<ToDo[]>{
    return this.http.get<ToDo[]>(this.root);
  }

  addTodo(todo: ToDo): Observable<ToDo>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      params: new InterceptorHttpParams({
        type: ToDo
      })
    };
    return this.http.post<ToDo>(this.root, todo, httpOptions);
  }

  editTodo(todo: ToDo): Observable<ToDo>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      }),
      params: new InterceptorHttpParams({
        type: ToDo
      })
    };
    return this.http.put<ToDo>(`${this.root}/${todo.id}`, todo, httpOptions);

  }
  
  deleteTodo(todo: ToDo): Observable<ToDo>{
    const httpOptions = {
      params: new InterceptorHttpParams({
        type: ToDo
      })
    };

    return this.http.delete<ToDo>(`${this.root}/${todo.id}`, httpOptions);
  }
}