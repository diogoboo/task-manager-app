import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../environment';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    if (this.isAuthenticated()) {

      localStorage.removeItem('token');
      this.router.navigate(['/login']);
      this.http.post(`${environment.apiBaseUrl}/logout`, {}).subscribe(
        () => {
          console.log('Logout successful');
        },
        (error) => {
          console.error('Logout error:', error);
        }
      );
    } else {

      this.router.navigate(['/login']);
    }
  }
}

