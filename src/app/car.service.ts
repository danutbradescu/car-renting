import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private baseUrl = 'http://localhost:5001/api'; // Update with your backend URL

  constructor(private http: HttpClient) { }

  addCar(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/cars`, formData);
  }

  getCarDetails(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/cars/${id}`);
  }

}
