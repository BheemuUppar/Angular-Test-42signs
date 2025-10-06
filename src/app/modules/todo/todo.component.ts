import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoService } from './services/todo.service';
import { Todo } from './interfaces/todo';
import { CommonModule } from '@angular/common';
import { TodoTableComponent } from './todo-table/todo-table.component';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-todo',
  imports: [CommonModule, TodoTableComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit, OnDestroy {
 todos: Todo[] = [];

 constructor(private todoService:TodoService){

 }
  ngOnDestroy(): void {
    this.todoService.unsubscribe.next(true)
  }

 ngOnInit(): void {
   this.fetchTodos();
   this.todoService.todoChange.pipe(takeUntil(this.todoService.unsubscribe)).subscribe({
    next:()=>{
      this.fetchTodos()
    },
    error:()=>{
      alert('failed to fetch Todos, try after some time')
    }
   })
 }

 fetchTodos(){
  this.todoService.fetchTodos().subscribe({
    next:(res:Todo[])=>{
      this.todos = res
   
    },
    error:(err)=>{
   console.log(err)
    }
  })
 }
 
}
