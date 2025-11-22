import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LoginRequest, LoginResponse } from '../models/auth.models';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';
import { tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);

  private readonly API_URL = environment.apiUrl;

  currentUser = signal<User | null>(null);

  constructor() {
    this.authUserFromCookies();
  }

  login(credentials: LoginRequest) {
    return this.http
      .post<LoginResponse>(`${this.API_URL}/auth/signin`, credentials)
      .pipe(
        tap((response) => {
          this.cookieService.set('token', response.accessToken, 1, '/');
          this.cookieService.set('user', JSON.stringify(response.user), 1, '/');

          this.currentUser.set(response.user);
        })
      );
  }

  logout() {
    this.cookieService.delete('token', '/');
    this.cookieService.delete('user', '/');

    this.currentUser.set(null);
  }

  private authUserFromCookies() {
    const token = this.cookieService.get('token');
    const userJson = this.cookieService.get('user');

    if (token && userJson) {
      try {
        const user = JSON.parse(userJson) as User;
        this.currentUser.set(user);
      } catch {
        this.logout();
      }
    }
  }
}
