export class ToDo{
    title: string;
    completed: boolean;
    url: string;
    id: number;

    constructor(title?){
        this.title = title ? title : "";
        this.completed = false;
        this.url = "";
    }
}