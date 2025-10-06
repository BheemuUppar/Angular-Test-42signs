import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Todo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http:HttpClient, private authService:AuthService) { }

  fetchTodos():Observable<any>{
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.authService.getAccessToken}`
    });
    return  this.http.get(environment.fetchTodos, {headers})
  }

  addTodo(todo:Todo):Observable<any>{
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.authService.getAccessToken}`
    });
    
   return this.http.post(environment.addTodo, todo, {headers} )
  }
}
