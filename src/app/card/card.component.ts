import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../environment';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  projects: any[] = [];
  newProject = '';
  tasks: { [projectId: number]: any[] } = {};
  newTask = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.http.get<string[]>(`${environment.apiBaseUrl}/projects`).subscribe((data) => {
      this.projects = data;

      this.projects.forEach((project) => {
        this.loadTasks(project.projectId);
      });
    });
  }

  loadTasks(projectId: number) {
    this.http.get<string[]>(`${environment.apiBaseUrl}/tasks/${projectId}`).subscribe((data) => {
      this.tasks[projectId] = data; 
    });
  }

  addProject() {
    if (this.newProject.trim() !== '') {
      this.http.post(`${environment.apiBaseUrl}/projects`, { description: this.newProject }).subscribe(() => {
        this.loadProjects(); 
        this.newProject = '';
      });
    }
  }

  addTask(projectId: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${environment.token}`
    });

    if (this.newTask.trim() !== '') {
      this.http.post(`${environment.apiBaseUrl}/tasks/${projectId}`, { description: this.newTask }, { headers }).subscribe(() => {
        this.loadTasks(projectId); 
        this.newTask = '';
      });
    }
  }

  removeProject(projectId: number) {
    this.http.delete(`${environment.apiBaseUrl}/projects/${projectId}`).subscribe(() => {
      this.projects = this.projects.filter(project => project.projectId !== projectId);
      this.loadProjects(); 
    });
  }

  removeTask(projectId: number, taskId: number) {
    this.http.delete(`${environment.apiBaseUrl}/tasks/${taskId}`).subscribe(() => {
      this.loadTasks(projectId); 
    });
  }
}
