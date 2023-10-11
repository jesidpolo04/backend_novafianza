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
import { ServicioExportacion } from "./ServicioExportacion";
import { GeneradorReporteColocacionUnMes } from "App/Dominio/Reportes/GeneradorReporteColocacionUnMes";

export class ServicioReportes {
    private servicioExportacion = new ServicioExportacion();
    constructor(private repositorio: RepositorioReportes) { }

    async obtenerReporteColocacion(filtros: FiltrosColocacion): Promise<ReporteColocacion> {
        let generadorReporte: GeneradorReporteColocacion
        let reporte: ReporteColocacion

        const fechaInicio = DateTime.fromFormat(filtros.fechaInicioCorte, FormatoFechas.FECHA_SAFIX)
        const fechaFinal = DateTime.fromFormat(filtros.fechaFinalCorte, FormatoFechas.FECHA_SAFIX)
        const diferenciaAnios = fechaFinal.year - fechaInicio.year

        if (diferenciaAnios == 0) {
            const diferenciaMeses = fechaFinal.month - fechaInicio.month
            if(diferenciaMeses > 1){
                generadorReporte = new GeneradorReporteColocacionUnAnio(this.repositorio)
            }else{
                generadorReporte = new GeneradorReporteColocacionUnMes(this.repositorio)
            }
            reporte = await generadorReporte.generar(filtros)
        } else if (diferenciaAnios == 1) {
            generadorReporte = new GeneradorReporteColocacionDosAnios(this.repositorio)
            reporte = await generadorReporte.generar(filtros)
        } else {
            throw new Exception('No se admiten rangos que abarquen más de 2 años.', 400)
        }
        return reporte
    }

    async obtenerReporteOperaciones(filtros: FiltrosOperaciones): Promise<Operaciones> {
        return this.repositorio.obtenerOperaciones(filtros)
    }

    async obtenerReporteSaldosCartera(filtros: FiltrosSaldosCartera): Promise<any> {
        const saldosCartera = await this.repositorio.obtenerSaldosCartera(filtros)
        return GeneradorReporteSaldosCartera.generarReporte(saldosCartera)
    }

    async obtenerProductos(empresa: string): Promise<Producto[]> {
        return this.repositorio.obtenerProductos(empresa)
    }

    async exportSaldosCartera(filtros: FiltrosSaldosCartera, cabeceras) {
        const saldosCartera = await this.repositorio.obtenerSaldosCartera(filtros);
        const datos = GeneradorReporteSaldosCartera.generarReporte(saldosCartera)

        const buffer = await this.servicioExportacion.exportToXLSX(datos.rodamientoCartera, cabeceras)
        return buffer;
    }


    async exportOperacion(filtros: FiltrosOperaciones, cabeceras) {
        const operaciones = await this.repositorio.obtenerOperaciones(filtros)
        const buffer = await this.servicioExportacion.exportToXLSX(operaciones.resumenOperaciones, cabeceras)
        return buffer;
    }
    async exportColocacion(filtros: FiltrosColocacion) {
        const colocacion = await this.obtenerReporteColocacion(filtros);
        const coberturas = colocacion.coberturasDisponibles;
        const cabeceras = [
            { header: 'Fecha', key: 'fechaMes', with:30 },
            { header: 'Vlr Coloc.', key: 'valorColocacion', with:30 },
            { header: 'Núm Créditos', key: 'numeroCreditos', with:30 },
            { header: 'Ticket', key: 'ticketPromedio', with:30 },
            { header: 'Plazo', key: 'plazoPromedio', with:30 },
            { header: 'Saldo', key: 'saldo', with:30 },
            { header: 'Disponible Fianza fija', key: 'valorDisponibleFianzaFija', with:30 },
            { header: 'Disponible Fianza variable', key: 'valorDisponibleFianzaVariable', with:30 },
            { header: 'Total disponible', key: 'valorTotalDisponible', with:30 },
            { header: 'Cobertura inicial', key: 'valorTotalDisponibleColocacion', with:30 }

        ]

        const buffer = await this.servicioExportacion.exportToXLSX(coberturas, cabeceras)
        return buffer;
    }
}