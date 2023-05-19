import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

const firebaseSignupUrl =
  'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCRXiOpzNHpEwzX5ltndxAVX9jwACvIFFc';
const firebaseLoginUrl =
  'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCRXiOpzNHpEwzX5ltndxAVX9jwACvIFFc';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  userSubject = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(firebaseSignupUrl, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(catchError(this.handleError))
      .pipe(tap(this.handleAuthentication.bind(this)));
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(firebaseLoginUrl, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(catchError(this.handleError))
      .pipe(tap(this.handleAuthentication.bind(this)));
  }

  logout() {
    this.userSubject.next(null);
    this.router.navigate(['/auth']);
  }

  private handleAuthentication(authResponseData: AuthResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + +authResponseData.expiresIn * 1000
    );
    const user = new User(
      authResponseData.email,
      authResponseData.localId,
      authResponseData.idToken,
      expirationDate
    );
    this.userSubject.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => new Error('An unknown error occurred!'));
    } else {
      return throwError(() => new Error(this.mapFirebaseError(errorRes)));
    }
  }

  private mapFirebaseError(firebaseErrorResponse: HttpErrorResponse): string {
    switch (firebaseErrorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        return 'This email already exists!';
      case 'EMAIL_NOT_FOUND':
        return 'This email does not exist!';
      case 'INVALID_PASSWORD':
        return 'This password is not correct!';
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        return 'Too many attempts, try again later!';
      case 'USER_DISABLED':
        return 'This user is disabled!';
      case 'OPERATION_NOT_ALLOWED':
        return 'This operation is not allowed!';
      case 'WEAK_PASSWORD : Password should be at least 6 characters':
        return 'Password should be at least 6 characters!';
      case 'INVALID_EMAIL':
        return 'This email is not valid!';
      case 'MISSING_PASSWORD':
        return 'Password is required!';
      case 'MISSING_EMAIL':
        return 'Email is required!';
      case 'INVALID_ID_TOKEN':
        return 'This token is not valid!';
      case 'USER_NOT_FOUND':
        return 'This user was not found!';
      default:
        return 'An unknown error occurred!';
    }
  }
}
