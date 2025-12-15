import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private snack: MatSnackBar) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError(err => {
        if (err.status === 401) {
          this.snack.open('Session abgelaufen. Bitte erneut einloggen.', 'OK', {
            duration: 4000,
            panelClass: ['error-snackbar']
          });

          localStorage.removeItem('jwt');
          this.router.navigate(['/login']);
        }

        return throwError(() => err);
      })
    );
  }
}

