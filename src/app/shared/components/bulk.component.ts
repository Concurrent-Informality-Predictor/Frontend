import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Formulario } from '../../models/formulario';
import { ApiService } from '../../core/api.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-bulk',
  imports: [CommonModule],
  templateUrl: './bulk.component.html',
  styleUrl: './bulk.component.scss'
})
export class BulkComponent {
  datos: Formulario[] = [];
  respuestas: { mensaje: string }[] = [];

  constructor(private api: ApiService) {}
  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>event.target;
    const file = target.files[0];
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json<Formulario>(ws);
      this.datos = data;
    };
    reader.readAsBinaryString(file);
  }

  procesarArchivo() {
    this.respuestas = this.api.getBulkResponse2(this.datos.length);
    return;
    // this.api.getBulkResponse(this.datos).subscribe((res) => {
    //   this.respuestas = res; // asumiendo que es un array [{mensaje: "..."}]
    // });
  }
}
