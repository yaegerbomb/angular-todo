import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
export class ErrorQueue{
    method: string;
    url: string;
    body: any;
    bodyType: any;
    headers: HttpHeaders;
    completed: boolean;
    errorResponse: HttpErrorResponse

    constructor(
        method: string, 
        url: string, 
        body: any, 
        headers: HttpHeaders, 
        bodyType: any,
        errorResponse: HttpErrorResponse
    ){
        this.method = method;
        this.url = url;
        this.body = body;
        this.headers = headers;
        this.completed = false;
        this.bodyType = bodyType;
        this.errorResponse = errorResponse;
    }
}