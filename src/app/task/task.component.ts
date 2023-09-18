import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: any[] = [];
  newTask = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Load tasks from the backend when the component initializes
    this.loadTasks();
  }

  loadTasks() {
    this.http.get<string[]>(`${environment.apiBaseUrl}/tasks`).subscribe((data) => {
      this.tasks = data;
    });
  }

  addTask() {
    if (this.newTask.trim() !== '') {
      this.http.post(`${environment.apiBaseUrl}/tasks`, { description: this.newTask }).subscribe(() => {
        this.loadTasks(); // Reload tasks after adding a new one
        this.newTask = '';
      });
    }
  }

  removeTask(taskName: string) {
    this.http.delete(`${environment.apiBaseUrl}/tasks/${taskName}`).subscribe(() => {
      this.loadTasks(); // Reload tasks after removing one
    });
  }
}
