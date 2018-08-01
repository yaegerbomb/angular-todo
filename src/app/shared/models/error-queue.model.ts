import { HttpHeaders } from '@angular/common/http';
export class ErrorQueue{
    method: string;
    url: string;
    body: any;
    headers: HttpHeaders;
    completed: boolean;

    constructor(method: string, url: string, body: any, headers: HttpHeaders){
        this.method = method;
        this.url = url;
        this.body = body;
        this.headers = headers;
        this.completed = false;
    }
}