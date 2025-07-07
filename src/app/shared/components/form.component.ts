import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../../core/api.service';
import { Formulario } from '../../models/formulario';
import { MatCardModule } from '@angular/material/card';

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
    MatCardModule
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  form: FormGroup;
  respuesta: number | null = null;

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.form = this.fb.group({
    edad: [null, [Validators.required, Validators.min(14)]],
    sexo: ['', Validators.required],
    nivel_educativo: ['', Validators.required],
    area: ['', Validators.required],
    categoria_ocupacional: ['', Validators.required],
    ingreso_mensual: [null, [Validators.required, Validators.min(0)]],
    horas_trabajadas: [null, [Validators.required, Validators.min(1)]],
  });

  }

  onSubmit() {
    if (this.form.valid) {
      const datos: Formulario = this.form.value;

      // Para pruebas locales sin backend
      // this.respuesta = this.api.getResponse2(datos); return;
      
      // Para producción con backend real:
      this.api.getResponse(datos).subscribe((res) => {
        console.log('Respuesta del servidor:', res);
        console.log('Respuesta del servidor:', res.probability);
        this.respuesta = res.probability;
      });
    }
  }
}
