import { ToDo } from '../models/todo.model';

export class FetchToDos {
    static readonly type = '[todo] fetch todos';
    constructor(){

    }
}

export class AddToDo {
    static readonly type = '[todo] add todo';
    constructor(public payload : ToDo){

    }
}

export class EditToDo {
    static readonly type = '[todo] edit todo';
    constructor(public payload : ToDo){

    }
}

export class SelectToDo {
    static readonly type = '[todo] select todo';
    constructor(public payload : ToDo){
        
    }
}

export class DeleteToDo {
    static readonly type = '[todo] delete todo';
    constructor(public payload : ToDo){

    }
}

export class CompleteToDo {
    static readonly type = '[todo] complete todo';
    constructor(public payload : ToDo){

    }
}