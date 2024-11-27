import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CnpjService {
  private apiUrl = 'https://brasilapi.com.br/api/cnpj/v1';

  constructor(private http: HttpClient) {}

  consultaCNPJ(cnpj: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${cnpj}`);
  }
}
