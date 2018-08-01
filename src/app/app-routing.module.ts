import { EditTodoComponent } from './todos/edit-todo/edit-todo.component';
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todos/todo-list/todo-list.component';
import { AddTodoComponent } from './todos/add-todo/add-todo.component';

const routes: Routes = [
  { path: '', component: TodoListComponent },
  { path: 'add', component: AddTodoComponent },
  { path: 'edit', component: EditTodoComponent}
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {}