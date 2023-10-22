import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { StorageSchema } from './models/storage-schema.model';
import { StorageService } from './services/storage.service';
import { MatButtonModule } from '@angular/material/button';
import { mockTasks } from './constants/constants';

@Component({
  selector: 'tmb-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  mockedTasks = mockTasks;
  vh = window.innerHeight * 0.01;

  constructor(private storage: StorageService<StorageSchema>) {}

  ngOnInit() {
    document.documentElement.style.setProperty('--vh', `${this.vh}px`);
    window.addEventListener('resize', () => {
      this.vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${this.vh}px`);
    });
  }

  addMockTasks() {
    const tasks = this.storage.getItem('tasks') || [];
    this.storage.setItem('tasks', [...tasks, ...this.mockedTasks()]);
  }

  clearTasks() {
    this.storage.clear();
  }
}
