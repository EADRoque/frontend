import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <--- 1. IMPORT THIS
import { ApiService, Gratitude } from '../../core/services/api.service';
import { RouterModule } from '@angular/router'; // <--- Add this for the routerLink

@Component({
  selector: 'app-gratitude-jar',
  standalone: true,
  // 2. ADD IT TO THIS LIST 👇
  imports: [CommonModule, FormsModule, RouterModule], 
  templateUrl: './gratitude-jar.component.html',
  styleUrl: './gratitude-jar.component.css'
})
export class GratitudeJarComponent {
  private api = inject(ApiService);

  gratitudeLogs: Gratitude[] = [];
  newLogContent = '';

  constructor() {
    this.loadLogs();
  }

  loadLogs() {
    this.api.getGratitudeLogs().subscribe(logs => {
      this.gratitudeLogs = logs;
    });
  }

  addLog() {
    if (!this.newLogContent.trim()) return;

    const newLog: Gratitude = {
      content: this.newLogContent,
      mood: 'Grateful'
    };

    this.api.addGratitudeLog(newLog).subscribe(savedLog => {
      this.gratitudeLogs.unshift(savedLog);
      this.newLogContent = '';
    });
  }

  resetApp() {
    if (confirm("⚠️ Are you sure you want to delete ALL data? This cannot be undone.")) {
      this.api.resetDatabase().subscribe(() => {
        // Clear the local list instantly
        this.gratitudeLogs = [];
        alert("The jar has been emptied.");
      });
    }
  }
}