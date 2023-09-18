import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projects: any[] = [];
  newProject = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Load projects from the backend when the component initializes
    this.loadProjects();
  }

  loadProjects() {


    this.http.get<string[]>(`${environment.apiBaseUrl}/projects`).subscribe((data) => {
      this.projects = data;
    });
  }

  addProject() {
    if (this.newProject.trim() !== '') {
      this.http.post(`${environment.apiBaseUrl}/projects`, { description: this.newProject }).subscribe(() => {
        this.loadProjects(); // Reload projects after adding a new one
        this.newProject = '';
      });
    }
  }

  removeProject(projectId: number) {
    this.http.delete(`${environment.apiBaseUrl}/projects/${projectId}`).subscribe(() => {
      this.loadProjects(); // Reload projects after removing one
    });
  }
}
