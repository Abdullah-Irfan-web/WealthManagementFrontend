import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';


  constructor(private http: HttpClient) {}
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
}
login(data: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/login`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
}