import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { environment } from '../environment';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationData = {
    username: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  onRegisterSubmit(form: NgForm) {
    if (form.invalid) {
	return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${environment.token}`
    });

    this.http.post<any>(`${environment.apiBaseUrl}/register`, this.registrationData, { headers }).subscribe(
      response => {
        console.log('Register successful:', response);
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Registration error:', error);
      }
    );
  }
}
