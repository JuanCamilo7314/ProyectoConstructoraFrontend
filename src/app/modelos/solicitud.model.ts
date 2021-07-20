import { ClienteModel } from "./cliente.model";
import { InmuebleModel } from "./inmueble.model";
import { UserModel } from "./user.model";
export class SolicitudModel{
    clienteId?: number;
    inmuebleId?: number;
    usuarioId?: string;
    FechaSolicitud?: string;
    OfertaEconomica?: number;
    EstadoSolicitud?: string;
    IdSolicitud?: number;
    cliente: ClienteModel = new ClienteModel();
    usuario: UserModel = new UserModel();
    inmueble: InmuebleModel = new InmuebleModel();
}