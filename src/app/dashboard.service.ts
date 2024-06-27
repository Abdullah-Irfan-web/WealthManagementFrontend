import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAssets(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getasset/${email}`);
  }

  getLiabilities(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getliability/${email}`);
  }
}
