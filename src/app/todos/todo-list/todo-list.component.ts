import { FetchToDos, SelectToDo, CompleteToDo, DeleteToDo } from '../../shared/actions/todo.actions';
import { ToDoState } from '../../shared/state/todos.state';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

import { ToDo } from '../../shared/models/todo.model';
import { Observable, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnDestroy {
  
  @Select(ToDoState.getToDos) toDos$: Observable<ToDo[]>;
  @Select(ToDoState.getNeedsFetch) needsFetch$: Observable<boolean>;

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);;


  constructor(private store: Store){
  }

  ngOnInit(){
    this.needsFetch$.pipe(takeUntil(this.destroyed$)).subscribe(nf => {
      if(nf){
        this.store.dispatch(FetchToDos);
      }
    });
  }
  
  ngOnDestroy(){
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  addToDo(){
    this.store.dispatch([
        new Navigate(['/add'])
    ]);
  }

  editToDo(todo: ToDo){
    this.store.dispatch([new SelectToDo(todo), new Navigate(['/edit'])]);
  }

  deleteToDo(todo: ToDo){
    this.store.dispatch(new DeleteToDo(todo));
  }

  completeToDo(todo: ToDo){
    this.store.dispatch(new CompleteToDo(todo));
  }
}
