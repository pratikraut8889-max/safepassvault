import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SSOSettingsService {
  private apiUrl = `${environment.api_url}/sso-settings`;

  constructor(private http: HttpClient) { }

  // Get all SSO settings
  getAllSettings(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // Get specific SSO settings by provider
  getSettingsByProvider(provider: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${provider}`);
  }

  // Create or update SSO settings
  saveSettings(settings: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}`, settings, { headers });
  }

  // Delete SSO settings by provider
  deleteSettings(provider: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${provider}`);
  }
}
