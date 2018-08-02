import { CompleteToDo } from '../actions/todo.actions';
import { DeleteToDo } from '../actions/todo.actions';
import { Reconnected } from '../actions/shared.actions';
import { TodoService } from '../services/todo.service';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap, catchError } from 'rxjs/operators';

import { FetchToDos, AddToDo, EditToDo, SelectToDo } from '../actions/todo.actions';
import { ToDo } from '../models/todo.model';
import { throwError } from 'rxjs';


export interface ToDoStateModel {
    toDos: ToDo[];
    selectedToDo: ToDo;
    needsFetch: boolean;
}


@State<ToDoStateModel>({
    name: 'todo',
    defaults: {
        toDos: [],
        selectedToDo: null,
        needsFetch: true
    }
})

export class ToDoState {
    constructor(private todoService: TodoService){}

    @Selector()
    static getNeedsFetch(state: ToDoStateModel){
        return state.needsFetch;
    }

    @Selector()
    static getToDos(state: ToDoStateModel){
        return state.toDos;
    }

    @Selector()
    static getSelectedToDo(state: ToDoStateModel){
        return state.selectedToDo;
    }

    @Action(Reconnected)
    Reconnected({patchState} : StateContext<ToDoStateModel>, {}){
        patchState({
            needsFetch: true
        })
    }


    @Action(SelectToDo)
    SelectToDo({patchState} : StateContext<ToDoStateModel>, { payload } : SelectToDo){
        patchState({
            selectedToDo: payload
        });
    }

    @Action(FetchToDos)
    fetchTodos({ patchState } : StateContext<ToDoStateModel>, { } : FetchToDos) {
        return this.todoService.getTodos()
            .pipe(
                catchError((x, caught) => {
                    return throwError(x);
                }),
                tap((result) => {
                    patchState({
                        toDos: result,
                        needsFetch: false
                    })
                })
            );
    }

    @Action(AddToDo)
    addToDo({ patchState, getState } : StateContext<ToDoStateModel>, { payload } : AddToDo){
        return this.todoService.addTodo(payload)
            .pipe(
                catchError((x, caught) => {
                    return throwError(x);
                }),
                tap((result) => {
                    patchState({
                        toDos: [ ...getState().toDos, result]
                    })
                })
            )
    }

    @Action(EditToDo)
    editToDo({ patchState, getState } : StateContext<ToDoStateModel>, { payload } : EditToDo){
        return this.todoService.editTodo(payload)
            .pipe(
                catchError((x, caught) => {
                    return throwError(x);
                }),
                tap((result) => {
                    let toDosList = getState().toDos;
                    const index = toDosList.findIndex(s => s.id == result.id);
                    if(index !== -1){
                        toDosList[index] = result;
                    }
                    patchState({
                        toDos: toDosList
                    })
                })
            )
    }

    @Action(DeleteToDo)
    deleteToDo({ patchState, getState } : StateContext<ToDoStateModel>, { payload } : DeleteToDo){
        return this.todoService.deleteTodo(payload)
            .pipe(
                catchError((x, caught) => {
                    return throwError(x);
                }),
                tap((result) => {
                    let toDosList = getState().toDos;
                    const index = toDosList.findIndex(s => s.id == payload.id);
                    if(index !== -1){
                        toDosList.splice(index, 1);
                    }
                    patchState({
                        toDos: toDosList
                    })
                })
            );
    }

    @Action(CompleteToDo)
    completeToDo({ patchState, getState } : StateContext<ToDoStateModel>, { payload } : CompleteToDo){
        payload.completed = true;
        return this.todoService.editTodo(payload)
            .pipe(
                catchError((x, caught) => {
                    return throwError(x);
                }),
                tap((result) => {
                    let toDosList = getState().toDos;
                    const index = toDosList.findIndex(s => s.id == result.id);
                    if(index !== -1){
                        toDosList[index] = result;
                    }
                    patchState({
                        toDos: toDosList
                    })
                })
            )
    }
}