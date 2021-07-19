import { CiudadModel } from "./ciudad.model";
export class ClienteModel{
    IdCliente?: number;
    DocumentoCli?: number;
    NombreCli?: string;
    ApellidoCli?: string;
    FechaNaciCli?: string;
    DImagenCli?: string;
    TelefonoCli?: string;
    EmailCli?: string;
    DireccionCli?:string;
    CiudadId?: number;
    TotIngresosCli?: number;
    DatosTrabajo?: string;
    TiemTrabajoAcCli?: string;
    NombreRefFamCli?: string;
    ApellidoRefFamCli?: string;
    TelefonoRefFamCli?: string;
    NombreRefPerCli?: string;
    ApellidoRefPerCli?: string;
    TelefonoRefPerCli?: string;
    ciudadId?: number;
    ciudad: CiudadModel=new CiudadModel();
}