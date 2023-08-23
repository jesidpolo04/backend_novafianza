import { SaldosCartera } from "../Datos/Entidades/Reportes/SaldosCartera/SaldosCartera";
import { ReporteSaldosCartera, RodamientoCartera } from "../Dto/Reportes/ReporteSaldosCartera";

export class GeneradorReporteSaldosCartera{
    static generarReporte(saldosCartera: SaldosCartera): ReporteSaldosCartera{
        return {
            rodamientoCartera: this.generarTablaDeRodamientosCartera(saldosCartera)
        }
    }

    static generarTablaDeRodamientosCartera(saldosCartera: SaldosCartera): RodamientoCartera[]{
        const rodamientosCartera: RodamientoCartera[] = [] 
        saldosCartera.flowRate.forEach( rango => {
            let fechaCierre = rango.rango_0_30.length > 0 ? rango.rango_0_30[0].periodo : "PRIMER RANGO VACÍO"
            rodamientosCartera.push({
                fechaCierre: fechaCierre,
                rango_0_30Dias: rango.rango_0_30.length > 0 ? rango.rango_0_30[0].valor : null,
                rango_31_60Dias: rango.rango_31_60.length > 0 ? rango.rango_31_60[0].valor : null,
                rango_61_90Dias: rango.rango_61_90.length > 0 ? rango.rango_61_90[0].valor : null,
                rango_91_120Dias: rango.rango_91_120.length > 0 ? rango.rango_91_120[0].valor : null,
                rango_121_150Dias: rango.rango_121_150.length > 0 ? rango.rango_121_150[0].valor : null,
                rango_151_180Dias: rango.rango_151_180.length > 0 ? rango.rango_151_180[0].valor : null,
                rango_181_210Dias: rango.rango_181_210.length > 0 ? rango.rango_181_210[0].valor : null,
                rango_211_240Dias: rango.rango_211_240.length > 0 ? rango.rango_211_240[0].valor : null,
                rango_241_270Dias: rango.rango_241_270.length > 0 ? rango.rango_241_270[0].valor : null,
                rango_271_300Dias: rango.rango_271_300.length > 0 ? rango.rango_271_300[0].valor : null,
                rango_301_330Dias: rango.rango_301_330.length > 0 ? rango.rango_301_330[0].valor : null,
                rango_331_360Dias: rango.rango_331_360.length > 0 ? rango.rango_331_360[0].valor : null,
                rango_361MasDias: rango.rango_361Mas.length > 0 ? rango.rango_361Mas[0].valor : null,
            })
        })
        return rodamientosCartera
    }
}