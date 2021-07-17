import { CiudadModel } from "./ciudad.model";

export class ProyectoModel{
    CodigoProy?: number;
    NombreProy?: string;
    DescripcionProy?: string;
    DImagen?: string;
    ciudadId?: number;
    ciudad: CiudadModel=new CiudadModel();
}