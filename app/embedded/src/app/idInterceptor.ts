import { Injectable } from '@angular/core';
import {
 HttpInterceptor,
 HttpRequest,
 HttpHandler,
 HttpEvent
} from '@angular/common/http';
 
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
 
@Injectable()
export class IdHttpInterceptor implements HttpInterceptor {
    id:string="NULL";
    constructor(private route: ActivatedRoute) {
        console.log('Called Constructor');
        this.route.queryParams.subscribe(params => {
            this.id = params['id'];
            console.log("Found Participant Id: ",this.id);
        });
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const cloneReq= request.clone({url: request.url+ "?id="+this.id});
        return next.handle(cloneReq);
    }
}