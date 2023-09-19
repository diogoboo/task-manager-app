import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environment';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() projectId: any;
  
  tasks: any[] = [];
  newTask = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.http.get<string[]>(`${environment.apiBaseUrl}/tasks/${this.projectId}`).subscribe((data) => {
      this.tasks = data;
    });
  }


  addTask() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${environment.token}`
    });

    if (this.newTask.trim() !== '') {
      this.http.post(`${environment.apiBaseUrl}/tasks/${this.projectId}`, { description: this.newTask }, { headers }).subscribe(() => {
        this.loadTasks(); 
        this.newTask = '';
      });
    }
  }

  removeTask(taskId: number) {
    this.http.delete(`${environment.apiBaseUrl}/tasks/${taskId}`).subscribe(() => {
      this.loadTasks(); // Reload tasks after removing one
    });
  }
}
