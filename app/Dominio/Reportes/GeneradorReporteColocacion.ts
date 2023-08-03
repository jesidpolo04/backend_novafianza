import { FiltrosColocacion } from "../Dto/Reportes/FiltrosColocacion";
import { ReporteColocacion } from "../Dto/Reportes/ReporteColocacion";

export abstract class GeneradorReporteColocacion{
    abstract generar(filtros: FiltrosColocacion): Promise<ReporteColocacion>
}