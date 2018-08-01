import { ToDoState } from '../../shared/state/todos.state';
import { EditToDo } from '../../shared/actions/todo.actions';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToDo } from '../../shared/models/todo.model';
import { Store, Select } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { Subscription, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css']
})
export class EditTodoComponent implements OnInit, OnDestroy {

  @Select(ToDoState.getSelectedToDo) selectedToDo$;

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  private selectedTodo : ToDo;

  @Select() app$;
  constructor(private store: Store){
  }

  ngOnInit(){
    this.selectedToDo$.pipe(takeUntil(this.destroyed$)).subscribe(
      std => this.selectedTodo = std
    );
  }

  ngOnDestroy(){
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  editToDo(){
    this.store.dispatch([
        new EditToDo(this.selectedTodo),
        new Navigate(['/'])
    ]);
  }

}
