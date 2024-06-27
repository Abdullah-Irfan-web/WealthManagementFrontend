import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LiabilityService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getLiabilities(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getliability/${email}`);
  }

  addLiability(liability: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addliability`, liability);
  }

  updateLiability(liability: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateliability`, liability);
  }

  deleteLiability(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/deleteliability/${id}`);
  }
}
