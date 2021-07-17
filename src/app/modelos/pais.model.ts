import { CiudadModel } from "./ciudad.model";

export class PaisModel{
    CodigoP?: number;
    NombreP?: string;
    ciudad: CiudadModel=new CiudadModel();
}