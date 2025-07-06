import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../../core/api.service';
import { Formulario } from '../../models/formulario';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  form: FormGroup;
  respuesta: string | null = null;

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.form = this.fb.group({
      edad: [null, [Validators.required, Validators.min(14)]],
      sexo: ['', Validators.required],
      nivelEducativo: ['', Validators.required],
      areaResidencia: ['', Validators.required],
      categoriaOcupacional: ['', Validators.required],
      ingresoMensual: [null, [Validators.required, Validators.min(0)]],
      horasSemanales: [null, [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const datos: Formulario = this.form.value;

      // Para pruebas locales sin backend
      this.respuesta = this.api.getResponse2(datos);

      // Para producción con backend real:
      // this.api.getResponse(datos).subscribe((res: { mensaje: string }) => {
      //   this.respuesta = res.mensaje;
      // });
    }
  }
}
