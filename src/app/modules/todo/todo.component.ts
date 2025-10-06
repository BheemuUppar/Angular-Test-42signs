import { Component, OnInit } from '@angular/core';
import { TodoService } from './services/todo.service';
import { Todo } from './interfaces/todo';
import { CommonModule } from '@angular/common';
import { TodoTableComponent } from './todo-table/todo-table.component';

@Component({
  selector: 'app-todo',
  imports: [CommonModule, TodoTableComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit {
 todos: Todo[] = [];

 constructor(private todoService:TodoService){

 }

 ngOnInit(): void {
   this.fetchTodos();
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
