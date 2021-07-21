import { SolicitudModel } from "./solicitud.model";

export class PagoModel{
    id?: number;
    imagenRecibo?: string;
    solicitudCliId?: number;
    solicitud: SolicitudModel=new SolicitudModel();
}