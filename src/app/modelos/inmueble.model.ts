import { BloqueModel } from "./bloque.model";

export class InmuebleModel{
    CodigoIn?: number;
    Identificador?: string;
    NombreIn?: string;
    ValorIn?: number;
    bloqueId?: number;
    bloque: BloqueModel=new BloqueModel();
}