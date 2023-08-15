import { Colocacion } from "../Datos/Entidades/Reportes/Colocacion/Colocacion";
import { Operaciones } from "../Datos/Entidades/Reportes/Operaciones/Operaciones";
import { FiltrosColocacion } from "../Dto/Reportes/FiltrosColocacion";
import { FiltrosOperaciones } from "../Dto/Reportes/FiltrosOperaciones";

export interface RepositorioReportes{
    obtenerColocacion(filtrosColocacion: FiltrosColocacion): Promise<Colocacion>
    obtenerOperaciones(filtrosOperaciones: FiltrosOperaciones): Promise<Operaciones>
}