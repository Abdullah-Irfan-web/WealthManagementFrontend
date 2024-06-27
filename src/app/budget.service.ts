// budget.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getBudget(email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getbudget/${email}`);
  }

  addBudget(budget: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addbudget`, budget);
  }

  updateBudget(budget: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/updatebudget`, budget);
  }

 
}
