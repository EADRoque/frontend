import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Matching your Python Models
export interface Gratitude {
  id?: number;
  content: string;
  mood?: string;
  created_at?: string;
}

export interface Scripture {
  id?: number;
  verse_text: string;
  reference: string;
  category: string;
  created_at?: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  
  // This points to your running FastAPI backend
  private apiUrl = window.location.hostname.includes('localhost')
  ? 'http://127.0.0.1:8000'
  : 'https://token-api-70mt.onrender.com';

  // --- Gratitude Jar ---
  getGratitudeLogs(): Observable<Gratitude[]> {
    return this.http.get<Gratitude[]>(`${this.apiUrl}/gratitude/`);
  }

  addGratitudeLog(log: Gratitude): Observable<Gratitude> {
    return this.http.post<Gratitude>(`${this.apiUrl}/gratitude/`, log);
  }

  // --- Scripture Tree ---
  getScriptures(): Observable<Scripture[]> {
    return this.http.get<Scripture[]>(`${this.apiUrl}/scriptures/`);
  }

  addScripture(scripture: Scripture): Observable<Scripture> {
    return this.http.post<Scripture>(`${this.apiUrl}/scriptures/`, scripture);
  }

  resetDatabase(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/reset/`);
  }
}