export interface iContratoAprobacion {
  state: string;
  serviceRequestInput: ServiceRequestInput;
}
export interface ServiceRequestInput {
  horasAprobadas: boolean;
  notas: string;
}
