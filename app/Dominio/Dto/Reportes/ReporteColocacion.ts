import { CoberturaDisponible } from "App/Dominio/Datos/Entidades/Reportes/Colocacion/CoberturaDisponible";
import { Grafico } from "./Grafico";

export class ReporteColocacion{
    colocacion: Grafico
    generos: Grafico
    departamentos: Grafico
    fianzasNetas: Grafico
    creditosDesembolsados: Grafico
    coberturasDisponibles: CoberturaDisponible[]
}