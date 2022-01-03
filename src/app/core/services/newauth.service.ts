import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TokenStorageService } from "./token-storage.service";



@Injectable({
  providedIn: 'root'
})
export class NewAuthService {
  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { 

  }

  private prepareOptions(): any {
    let headers = new HttpHeaders();
    headers = headers
      .set('Content-Type', 'application/json');
    return { headers };
  }

  
  login(azureToken) : Observable<any>{
    const httpOptions = this.prepareOptions();
    let body =
      {
        azure_token: azureToken,
        device: 'Test',
      }
    
    
    return this.http.post<any>(`${environment.hrDeskApiConfig.api_url}v1/auth/login-using-azure-adal`, JSON.stringify(body), httpOptions);


 }
 refreshToken(token: string) {
  const httpOptions = this.prepareOptions();
  const user = this.tokenStorageService.getUser();

  let body = {
      access_token: user.access_token,
      refresh_token: user.refresh_token,
  }
  return this.http.post(`${environment.hrDeskApiConfig.api_url}v1/auth/login-using-refresh-token`, JSON.stringify(body), httpOptions);
}

public prepareOptionsForEndpoints(): any {
  let headers = new HttpHeaders();
  let token = this.tokenStorageService.getToken();
  headers = headers
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`);
  // console.log('headers', headers);
  return { headers };
}

}
