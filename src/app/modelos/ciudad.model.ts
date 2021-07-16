import { PaisModel } from "./pais.model";

export class CiudadModel{
    CodigoC?: number;
    NombreC?: string;
    paisId?: number;
    pais: PaisModel=new PaisModel();
}