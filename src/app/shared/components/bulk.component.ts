import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/api.service';
import * as XLSX from 'xlsx';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-bulk',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './bulk.component.html',
  styleUrl: './bulk.component.scss'
})
export class BulkComponent {
  datos: any[] = [];  // Cambiado de Formulario[] a any[] para reflejar los nuevos nombres del backend
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [
    'edad',
    'sexo',
    'nivel_educativo',
    'area',
    'categoria_ocupacional',
    'ingreso_mensual',
    'horas_trabajadas',
    'respuesta'
  ];
  respuestas: { probability: number }[] = [];
  nombreArchivo: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private api: ApiService) {}

  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>event.target;
    const file = target.files[0];
    this.nombreArchivo = file.name;
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json<any>(ws);  // leer con claves planas esperadas por el backend
      this.datos = data;
    };
    reader.readAsBinaryString(file);
  }

  procesarArchivo() {
    this.api.getBulkResponse(this.datos).subscribe((respuestas) => {
      const datosConRespuesta = this.datos.map((item, index) => ({
        ...item,
        respuesta: respuestas[index]?.probability || 0
      }));
      this.dataSource.data = datosConRespuesta;
      this.dataSource.paginator = this.paginator;
    });
  }

  procesarArchivoLocal() {
    // this.respuestas = this.api.getBulkResponse2(this.datos);
    this.api.getBulkResponse(this.datos).subscribe((respuestas) => {
      this.respuestas = respuestas;
      const datosConRespuesta = this.datos.map((item, index) => ({
        ...item,
        respuesta: this.respuestas[index]?.probability || 0
      }));
      this.dataSource.data = datosConRespuesta;
      this.dataSource.paginator = this.paginator;
    });
  }
}
