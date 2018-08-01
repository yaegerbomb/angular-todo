import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

import { AddToDo } from '../../shared/actions/todo.actions';

import { ToDo } from '../../shared/models/todo.model';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  private newTodo : ToDo;

  @Select() app$;
  constructor(private store: Store){
  }

  ngOnInit(){
    this.newTodo = new ToDo();
  }

  addToDo(){
    this.store.dispatch([
        new AddToDo(this.newTodo),
        new Navigate(['/'])
    ]);
  }
}
