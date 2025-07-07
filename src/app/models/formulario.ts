export interface Formulario {
  area: 'Urbano' | 'Rural';
  sexo: 'Hombre' | 'Mujer';
  edad: number;
  nivel_educativo:
    | 'Sin nivel'
    | 'Educación Inicial'
    | 'Básica especial'
    | 'Primaria incompleta'
    | 'Primaria completa'
    | 'Secundaria incompleta'
    | 'Secundaria completa'
    | 'Superior no universitaria incompleta'
    | 'Superior no universitaria completa'
    | 'Superior universitaria incompleta'
    | 'Superior universitaria completa'
    | 'Maestría/Doctorado';
  categoria_ocupacional:
    | 'Ayudante en un negocio de la familia'
    | 'Practicante no remunerado'
    | 'Aprendiz/practicante remunerado'
    | 'Trabajador del hogar'
    | 'Ayudante en un negocio de la familia de otro hogar'
    | 'Empleado u obrero'
    | 'Trabajador independiente'
    | 'Empleador o patrono';
  horas_trabajadas: number;
  ingreso_mensual: number;
}
