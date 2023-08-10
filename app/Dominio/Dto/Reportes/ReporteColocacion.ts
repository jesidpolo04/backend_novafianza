import { CoberturaDisponible } from "App/Dominio/Datos/Entidades/Reportes/Colocacion/CoberturaDisponible";
import { Grafico } from "./Grafico";
import { ResumenColocacion } from "App/Dominio/Datos/Entidades/Reportes/Colocacion/ResumenColocacion";

export class ReporteColocacion{
    resumen: ResumenColocacion
    colocacion: Grafico
    generos: Grafico
    departamentos: Grafico
    fianzasNetas: Grafico
    creditosDesembolsados: Grafico
    coberturasDisponibles: CoberturaDisponible[]
}