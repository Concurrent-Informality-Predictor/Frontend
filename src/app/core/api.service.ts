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
  getBulkResponse(data: Formulario[]): Observable<RespuestaInformalidad[]> {
    return this.http.post<RespuestaInformalidad[]>('url/bulk', data);
  }
  getBulkResponse2(n: number): RespuestaInformalidad[] {
    const respuestas: RespuestaInformalidad[] = [];
    for (let i = 0; i < n; i++) {
      respuestas.push({ mensaje: 'Informal' });
    }
    return respuestas;
  }
}
