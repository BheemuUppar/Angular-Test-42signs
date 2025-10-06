import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Todo } from '../interfaces/todo'; // Adjust path
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-todo-details',
  imports: [CommonModule],
  templateUrl: './todo-details.component.html',
  styleUrl: './todo-details.component.css'
})
export class TodoDetailsComponent {
 constructor(
    @Inject(MAT_DIALOG_DATA) public data: Todo,
    private dialogRef: MatDialogRef<TodoDetailsComponent>
  ) {}

   close() {
    this.dialogRef.close();
  }
}
