import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TodoDetailsComponent } from '../todo-details/todo-details.component';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoService } from '../services/todo.service';
import { SnackbarService } from '../../../shared/services/snackbar.service';
@Component({
  selector: 'app-todo-table',
  imports: [CommonModule, 
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule],
  templateUrl: './todo-table.component.html',
  styleUrl: './todo-table.component.css',
  providers:[SnackbarService]
})
export class TodoTableComponent implements OnChanges, OnInit {
  @Input() todos: Todo[] = []
  displayedColumns: string[] = ['id', 'title', 'description', 'isCompleted', 'action'];
  dataSource = new MatTableDataSource<Todo>([]);
  searchSubject = new Subject();
  
  @ViewChild(MatPaginator) paginator !: MatPaginator;


  constructor(private dialog: MatDialog, private todoService:TodoService, private snackbarService:SnackbarService){

  }
  ngOnInit(): void {
    this.searchSubject.pipe(  debounceTime(1000),takeUntil(this.todoService.unsubscribe)).subscribe((searchText :any)=>{
     const filterValue = searchText;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource<Todo>(this.todos)
this.dataSource.paginator = this.paginator;
  }

  onSearch(event:any){
    this.searchSubject.next(event.target.value)
    // console.log('eeee' , event)
  }

  

  get filteredData() {
    return this.dataSource.filteredData;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onRowClick(row : Todo){
    this.dialog.open(TodoDetailsComponent, {
    data: row,
    panelClass: 'custom-dialog-container', 
    height:'300px',
    width:'450px',
  });
  }

  addTodo(event:Event) {
    event.stopPropagation();
    event.preventDefault();
    // console.log("hel;llllllllllo ")
    const dialogRef = this.dialog.open(TodoFormComponent, {
    width: '400px',
    data: null, // No data for adding
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('New Todo:', result);
      this.todoService.addTodo(result).subscribe((res)=>{
          // alert('todo added success')
          this.snackbarService.success('Todo added successfully!')
          this.todoService.todoChange.next(true)
      })
    }
  });
}

editTodo(event :Event, row: Todo) {
  event.stopPropagation();
    event.preventDefault();
  const dialogRef = this.dialog.open(TodoFormComponent, {
    width: '400px',
    data: row, // Pass existing todo
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // console.log('Updated Todo:', result);
       this.todoService.updateTodo(result).subscribe((res)=>{
          // alert('todo updated success')
           this.snackbarService.success('Todo updated successfully!')
          this.todoService.todoChange.next(true)
      })
      
    }
  });
} 

}
