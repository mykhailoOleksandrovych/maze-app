import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MazeService {
  private apiUrl = 'https://michaelkh.pythonanywhere.com/maze';

  constructor(private http: HttpClient) { }

  getMaze(rows: number, cols: number): Observable<number[][]> {
    return this.http.get<number[][]>(`${this.apiUrl}/${rows}/${cols}`);
  }
}