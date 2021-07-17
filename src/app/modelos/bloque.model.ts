import { ProyectoModel } from "./proyecto.model";

export class BloqueModel{
    CodigoB?: number;
    NombreB?: string;
    proyectoId?: number;
    proyecto: ProyectoModel=new ProyectoModel();
}