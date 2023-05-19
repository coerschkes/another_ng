import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const authServiceUrl =
  'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCRXiOpzNHpEwzX5ltndxAVX9jwACvIFFc';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(authServiceUrl, {
      email: email,
      password: password,
      returnSecureToken: true,
    });
  }
}
