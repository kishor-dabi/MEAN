import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse }   from '@angular/common/http';
import { Injectable } from "@angular/core"
import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    constructor(public toasterService: ToastrService, private router:Router) {}
intercept(
        req: HttpRequest<any>,
        next: HttpHandler
      ): Observable<HttpEvent<any>> {
    
        return next.handle(req).pipe(
            tap(evt => {
                if (evt instanceof HttpResponse) {
                    console.log(evt);
                    // return
                    // if(evt.body && evt.body.success)
                    //     this.toasterService.success(evt.body.success.message, evt.body.success.title, { positionClass: 'toast-bottom-center' });
                }
                return next.handle(req);

            }),
            catchError((err: any) => {
                if(err instanceof HttpErrorResponse) {


                    console.log(err);
                    if (err.status == 302 && err.error.url == '/') {
                        localStorage.clear();
                        this.router.navigate(['/'])
                    }
                    // return er
                    return next.handle(req);

                    try {
                        this.toasterService.error(err.error.message, err.error.title, { positionClass: 'toast-bottom-center' });
                    } catch(e) {
                        this.toasterService.error('An error occurred', '', { positionClass: 'toast-bottom-center' });
                    }
                    //log error 
                }
                return of(err);
            }));
    
      }
      
}