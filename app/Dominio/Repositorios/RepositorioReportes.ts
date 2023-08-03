import { Colocacion } from "../Datos/Entidades/Reportes/Colocacion/Colocacion";
import { FiltrosColocacion } from "../Dto/Reportes/FiltrosColocacion";

export interface RepositorioReportes{
    obtenerColocacion(filtrosColocacion: FiltrosColocacion): Promise<Colocacion>
}