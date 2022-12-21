export interface iTaskContext {
  serviceRequest_ref: ServiceRequestRef;
  parametros_ref: ParametrosRef;
}

export interface ServiceRequestRef {
  name: string;
  type: string;
  link: string;
  storageId: number;
  storageId_string: string;
}

export interface ParametrosRef {
  name: string;
  type: string;
  link: string;
  storageId: number;
  storageId_string: string;
}
