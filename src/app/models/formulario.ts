export interface Formulario {
  edad: number;
  sexo: 'Hombre' | 'Mujer';
  nivelEducativo: 'Sin primaria' | 'Primaria' | 'Secundaria' | 'Técnico' | 'Universitario';
  areaResidencia: 'Urbano' | 'Rural';
  categoriaOcupacional: 'Independiente' | 'Empleador' | 'Dependiente';
  ingresoMensual: number;
  horasSemanales: number;
}
