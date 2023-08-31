import { Exception } from "@adonisjs/core/build/standalone";
import { FiltrosColocacion } from "App/Dominio/Dto/Reportes/FiltrosColocacion";
import { FiltrosOperaciones } from "App/Dominio/Dto/Reportes/FiltrosOperaciones";
import { ReporteColocacion } from "App/Dominio/Dto/Reportes/ReporteColocacion";
import { FormatoFechas } from "App/Dominio/FormatoFechas";
import { GeneradorReporteColocacion } from "App/Dominio/Reportes/GeneradorReporteColocacion";
import { GeneradorReporteColocacionDosAnios } from "App/Dominio/Reportes/GeneradorReporteColocacionDosAnio";
import { GeneradorReporteColocacionUnAnio } from "App/Dominio/Reportes/GeneradorReporteColocacionUnAnio";
import { RepositorioReportes } from "App/Dominio/Repositorios/RepositorioReportes";
import { DateTime } from "luxon";
import { Operaciones } from "../Entidades/Reportes/Operaciones/Operaciones";
import { FiltrosSaldosCartera } from "App/Dominio/Dto/Reportes/FiltrosSaldosCartera";
import { ReporteSaldosCartera } from "App/Dominio/Dto/Reportes/ReporteSaldosCartera";
import { GeneradorReporteSaldosCartera } from "App/Dominio/Reportes/GeneradorReporteSaldosCartera";
import { Producto } from "../Entidades/Reportes/Producto/Producto";

export class ServicioReportes{
    constructor(private repositorio: RepositorioReportes){}

    async obtenerReporteColocacion(filtros: FiltrosColocacion): Promise<ReporteColocacion>{
        let generadorReporte: GeneradorReporteColocacion
        let reporte: ReporteColocacion

        const fechaInicio = DateTime.fromFormat(filtros.fechaInicioCorte, FormatoFechas.FECHA_SAFIX)
        const fechaFinal = DateTime.fromFormat(filtros.fechaFinalCorte, FormatoFechas.FECHA_SAFIX)
        const diferenciaAnios = fechaFinal.year - fechaInicio.year
        
        if(diferenciaAnios == 0){
            generadorReporte = new GeneradorReporteColocacionUnAnio( this.repositorio )
            reporte = await generadorReporte.generar(filtros)
        }else if (diferenciaAnios == 1){
            generadorReporte = new GeneradorReporteColocacionDosAnios( this.repositorio )
            reporte = await generadorReporte.generar(filtros)
        }else{
            throw new Exception('No se admiten rangos que abarquen más de 2 años.', 400)
        }
        return reporte
    }
    
    async obtenerReporteOperaciones(filtros: FiltrosOperaciones): Promise<Operaciones>{
        return this.repositorio.obtenerOperaciones(filtros)
    }

    async obtenerReporteSaldosCartera(filtros: FiltrosSaldosCartera): Promise<any>{
        const saldosCartera = await this.repositorio.obtenerSaldosCartera(filtros)
        saldosCartera.flowRate[0].rango_0_30
        return GeneradorReporteSaldosCartera.generarReporte(saldosCartera)
    }

    async obtenerProductos(empresa: string): Promise<Producto[]>{
        return this.repositorio.obtenerProductos(empresa)
    }
}