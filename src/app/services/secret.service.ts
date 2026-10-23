import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecretService {

  private apiUrl = `${environment.api_url}/secrets`;


  constructor(private http: HttpClient) { }

  // Create a new secret (API key, credential, etc.)
  createSecret(secret: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, secret);
  }

  // Retrieve all secrets (with decrypted values)
  getSecrets(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/all`);
  }

  deleteSecret(secretId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${secretId}`);
  }
}



