import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { environment } from '../environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData = {
    username: '',
    password: '',
  };

  constructor(private http: HttpClient, private router: Router) {}

  onLoginSubmit(form: NgForm) {
    if (form.invalid) {
      return; 
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${environment.token}`
    });
    
    this.http
      .post<any>(`${environment.apiBaseUrl}/login`, this.loginData, { headers })
      .subscribe(
        (response) => {
          if (response && response.token) {
            console.log('Login successful:', response);
            localStorage.setItem('token', response.token);
            this.router.navigate(['/']);

          } else {
            console.error('Login response does not contain a valid token');
          }
        },
        (error) => {
          console.error('Login error:', error);
        }
      );
  }
}
