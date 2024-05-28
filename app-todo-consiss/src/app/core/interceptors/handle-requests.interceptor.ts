import {
  // HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { from, switchMap } from 'rxjs';

@Injectable()
export class HandleRequestsInterceptor implements HttpInterceptor {

  constructor(private storage: Storage) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): any {
    return from(this.storage.get('user')).pipe(
      switchMap(user => {
        if (user) {
          const clonedReq = request.clone({
            setHeaders: {
              Authorization: `Bearer ${user?.token}`
            }
          });
          return next.handle(clonedReq);
        } else {
          return next.handle(request);
        }
      })
    );
  }
}
