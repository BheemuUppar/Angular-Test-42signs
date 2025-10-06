import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Todo } from '../interfaces/todo';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-todo-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css'
})
export class TodoFormComponent implements OnInit{
 todoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TodoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Todo | null
  ) {}

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      title: [this.data?.title || '', Validators.required],
      description: [this.data?.description || '', Validators.required],
      isCompleted: [this.data?.isCompleted || false],
    });
  }

  submit() {
    if (this.todoForm.valid) {
      this.dialogRef.close(this.todoForm.value);
    }
  }

  close() {
    this.dialogRef.close();
  }

}
