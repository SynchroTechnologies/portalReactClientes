export interface iServiceRequestTask {
  persistenceId: number;
  persistenceId_string: string;
  persistenceVersion: number;
  persistenceVersion_string: string;
  alarma: string;
  descripcion: string;
  categoria: string;
  tiempo?: any;
  tiempo_string?: any;
  notas?: any;
  prioridad: string;
  fechaEsperada: Date;
  validarSatisfaccion?: any;
  estado: string;
  horasAprobadas?: any;
  asignacion: string;
  notasInternas?: any;
  ci: string;
}
