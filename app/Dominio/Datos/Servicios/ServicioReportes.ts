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
}