import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getTransactions(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/gettransaction/${email}`);
  }

  addTransaction(transaction: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addtransaction`, transaction);
  }
}
