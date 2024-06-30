import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getPayments(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getpayments/${email}`);
  }

  makePayment(paymentData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/makepayment`, paymentData);
  }
}
