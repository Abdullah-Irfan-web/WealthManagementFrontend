import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAssets(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getasset/${email}`);
  }

  addAsset(asset: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addassest`, asset);
  }

  updateAsset(asset: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateasset`, asset);
  }

  deleteAsset(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/deleteasset/${id}`);
  }
}
