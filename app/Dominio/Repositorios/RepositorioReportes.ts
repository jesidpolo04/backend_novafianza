import { Colocacion } from "../Datos/Entidades/Reportes/Colocacion/Colocacion";
import { Operaciones } from "../Datos/Entidades/Reportes/Operaciones/Operaciones";
import { SaldosCartera } from "../Datos/Entidades/Reportes/SaldosCartera/SaldosCartera";
import { FiltrosColocacion } from "../Dto/Reportes/FiltrosColocacion";
import { FiltrosOperaciones } from "../Dto/Reportes/FiltrosOperaciones";
import { FiltrosSaldosCartera } from "../Dto/Reportes/FiltrosSaldosCartera";

export interface RepositorioReportes{
    obtenerColocacion(filtrosColocacion: FiltrosColocacion): Promise<Colocacion>
    obtenerOperaciones(filtrosOperaciones: FiltrosOperaciones): Promise<Operaciones>
    obtenerSaldosCartera(filtrosSaldosCartera: FiltrosSaldosCartera): Promise<SaldosCartera>
}