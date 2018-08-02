import { HttpParams } from '@angular/common/http';
import { HttpParamsOptions } from '@angular/common/http/src/params';

export class InterceptorHttpParams extends HttpParams {
    constructor(
        public interceptorConfig: { type: any },
        params?: { [param: string]: string | string[] }
    ) {
        super({ fromObject: params } as HttpParamsOptions);
    }
}