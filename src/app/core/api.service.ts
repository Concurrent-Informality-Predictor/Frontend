import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Formulario } from '../models/formulario';

interface RespuestaInformalidad {
  mensaje: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  
  getResponse(data: Formulario): Observable<RespuestaInformalidad> {
    return this.http.post<any>('url', data);
  }
  getResponse2(data: Formulario): string {
    return 'Informal';
  }
}
