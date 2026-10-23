import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(
    private http: HttpClient,
  ) { }



  getLogs(params: any): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/audit`, {
      params: params
    })
  }
}
