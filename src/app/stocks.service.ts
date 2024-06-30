import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StocksService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getStockData(symbol: string): Observable<any> {
    return this.http.get(`http://localhost:3000/api/stock?symbol=${symbol}`);
  }

  getPortfolio(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getstock/${email}`);
  }

  addStockToPortfolio(stock: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addstock`, stock, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  sellStock(stock:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/sellstock`,stock,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
