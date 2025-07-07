import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Formulario } from '../models/formulario';
import { environment } from '../../environments/environment';

interface RespuestaInformalidad {
  probability: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url: string = environment.apiUrl; 
  constructor(private http: HttpClient) { }
  
  getResponse(data: Formulario): Observable<RespuestaInformalidad> {
    return this.http.post<RespuestaInformalidad>(this.url + 'predict', data);
  }
  getResponse2(data: Formulario): number {
    return data.edad/100;
  }
  getBulkResponse(data: Formulario[]): Observable<RespuestaInformalidad[]> {
    return this.http.post<RespuestaInformalidad[]>(this.url+'predict/batch', data);
  }
  getBulkResponse2(data: Formulario[]): RespuestaInformalidad[] {
    const respuestas: RespuestaInformalidad[] = [];
    const n = data.length;
    for (let i = 0; i < n; i++) {
      respuestas.push({probability: data[i].edad/100});
    }
    return respuestas;
  }
}
