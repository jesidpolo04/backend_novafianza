import { DateTime } from "luxon";
import { SaldosCartera } from "../Datos/Entidades/Reportes/SaldosCartera/SaldosCartera";
import { Amortizacion, Cosecha, Cosechas, DisponibleCoberturasAlturaMora, EvolucionSaldosCartera, PerdidaIncurrida, PerdidaPotencial, ReporteSaldosCartera, RodamientoCartera, SubEtiquetaAnio } from "../Dto/Reportes/ReporteSaldosCartera";
import { GrupoDato } from "../Dto/Reportes/Grafico";
import { Indicador } from "../Datos/Entidades/Reportes/SaldosCartera/Indicador";

export class GeneradorReporteSaldosCartera{
    static generarReporte(saldosCartera: SaldosCartera): ReporteSaldosCartera{
        return {
            rodamientoCartera: this.generarTablaDeRodamientosCartera(saldosCartera),
            cosechas: this.generarTablaCosechas(saldosCartera),
            evolucionSaldosCartera: this.generarGraficoEvolucionSaldosCartera(saldosCartera),
            amortizacion: this.generarAmortizacion(saldosCartera),
            perdidaIncurrida: this.generarPerdidaIncurrida(saldosCartera),
            disponibleCoberturas: this.generarDisponibleCoberturas(saldosCartera),
            perdidaPotencial: this.generarPerdidaPotencial(saldosCartera),
            totales: saldosCartera.variablesTotales
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

    static generarTablaCosechas(saldosCartera: SaldosCartera): Cosechas{
        let cabeceras: string[] = []
        let cosechas: Cosecha[] = []
        saldosCartera.saldosCarteraCosechas.forEach( cosecha => {
            if(cosecha.mesesMaduracion.length > cabeceras.length){
                cabeceras = cosecha.mesesMaduracion.map( mesMaduracion => mesMaduracion.mes )
            }
            cosechas.push({
                fecha: cosecha.fechaColocacion ?? "SIN FECHA",
                mesesMaduracion: cosecha.mesesMaduracion,
                numCreditos: cosecha.numCreditos,
                plazo: cosecha.plazo,
                saldo: 0,
                ticket: cosecha.ticket,
                vlrColocacion: cosecha.vlrColocacion
            })
        })
        return {
            cabecerasMeses: cabeceras,
            cosechas: cosechas,
        }
    }

    static generarGraficoEvolucionSaldosCartera(saldosCartera: SaldosCartera): EvolucionSaldosCartera{
        let etiquetas: string[] = []
        let subEtiquetas: SubEtiquetaAnio[] = []
        let saldos: GrupoDato = {
            datos: [],
            etiqueta: 'Saldos'
        }
        let icv30: GrupoDato = {
            datos: [],
            etiqueta: 'ICV 30+'
        }
        let icv60: GrupoDato = {
            datos: [],
            etiqueta: 'ICV 60+',
        }
        let icv120: GrupoDato = {
            datos: [],
            etiqueta: 'ICV 120+',
        }
        let icv150: GrupoDato = {
            datos: [],
            etiqueta: 'ICV 150+',
        }

        saldosCartera.evolucionSaldosCartera.forEach(evolucion => {
            if(!etiquetas.includes(evolucion.periodo)){
                etiquetas.push(evolucion.periodo)
            }
        });
        saldosCartera.evolucionSaldosCartera.forEach( evolucion => {
            const fecha = DateTime.fromFormat(evolucion.periodo, 'yyyyMM')
            const subEtiqueta: SubEtiquetaAnio = {
                anio: fecha.year.toString(),
                numeroMeses: 1
            }
            if(!this.existeSubEtiqueta(subEtiqueta, subEtiquetas)){
                subEtiquetas.push(subEtiqueta)
            }else{
                subEtiquetas = subEtiquetas.map( subEtiquetaExistente => {
                    if(subEtiqueta.anio === subEtiquetaExistente.anio){
                        subEtiquetaExistente.numeroMeses++;
                    }
                    return subEtiquetaExistente
                })
            }
        })

        saldosCartera.evolucionSaldosCartera.forEach( evolucion =>{
            if(evolucion.indicador === 'ICV 30+'){
                icv30.datos.push(evolucion.valor * evolucion.valorPorcentaje)
                saldos.datos.push(evolucion.valor)
            }
            if(evolucion.indicador === 'ICV 60+') icv60.datos.push(evolucion.valor * evolucion.valorPorcentaje);
            if(evolucion.indicador === 'ICV 120+') icv120.datos.push(evolucion.valor * evolucion.valorPorcentaje);
            if(evolucion.indicador === 'ICV 150+') icv150.datos.push(evolucion.valor * evolucion.valorPorcentaje);
        })

        return {
            etiquetas,
            icv120,
            icv150,
            icv30,
            icv60,
            saldos,
            subEtiquetas
        }
    }

    private static existeSubEtiqueta(subEtiqueta: SubEtiquetaAnio, subEtiquetas: SubEtiquetaAnio[]): boolean{
        const etiqueta = subEtiquetas.find( subEtiquetaExistente => subEtiquetaExistente.anio === subEtiqueta.anio )
        return etiqueta ? true : false
    }


    static generarAmortizacion(saldosCartera: SaldosCartera): Amortizacion{
        let subEtiquetas: SubEtiquetaAnio[] = [] 
        let etiquetas: string[] = saldosCartera.amortizacion.map( amortizacion =>  amortizacion.fechaColocacion)
        let amortizacion: GrupoDato
        saldosCartera.amortizacion.forEach( amortizacion => {
            const fecha = DateTime.fromFormat(amortizacion.fechaColocacion, 'yyyyMM')
            const subEtiqueta: SubEtiquetaAnio = {
                anio: fecha.year.toString(),
                numeroMeses: 1
            }
            if(!this.existeSubEtiqueta(subEtiqueta, subEtiquetas)){
                subEtiquetas.push(subEtiqueta)
            }else{
                subEtiquetas = subEtiquetas.map( subEtiquetaExistente => {
                    if(subEtiqueta.anio === subEtiquetaExistente.anio){
                        subEtiquetaExistente.numeroMeses++;
                    }
                    return subEtiquetaExistente
                })
            }
        })
        amortizacion = {
            etiqueta: 'Armt. Real',
            datos: saldosCartera.amortizacion.map( amortizacion => {
                if(amortizacion.valoresAmortizacion.length > 0) return amortizacion.valoresAmortizacion[0].porcentajeAmortizacion;
                else return null;
            })
        }

        return {
            amortizacion,
            etiquetas,
            subEtiquetas
        }
    }

    static generarPerdidaIncurrida(saldosCartera: SaldosCartera): PerdidaIncurrida[]{
        return saldosCartera.coberturas.map( cobertura => {
            return {
                colocacion: cobertura.vlrColocacion,
                disponibleCoberturaPorAlturaDeMora: cobertura.vlrPerdidaPotencial,
                disponibleParaPagoNeto: cobertura.vlrDisponiblePagosNeto,
                disponibleParaPagos: cobertura.vlrDoisponiblePagos,
                fechaColocacion: cobertura.periodo,
                fianzasNetas: cobertura.vlrFianzasNetas,
                perdidaIncurrida: cobertura.vlrPerdidaIncurrida,
                reclamacionHastaPenultimoMes: cobertura.vlrReclamacionPenUltMes,
                reclamacionUltimoMes: cobertura.vlrReclamacionUltMes,
                saldos120Mas: cobertura.vlrSaldoMoraMas120,
            }
        })
    }

    static generarDisponibleCoberturas(saldosCartera: SaldosCartera): DisponibleCoberturasAlturaMora[]{
        return saldosCartera.coberturasDisponibles.map( cobertura => {
            return {
                alturaMora: cobertura.indicador,
                disponibleParaCoberturas: cobertura.vlrDisponibleCobertura,
                porcentajeCobertura: cobertura.vlrPorcentajeCobertura,
                saldoPorAlturaMora: cobertura.valor
            }
        })
    }

    static generarPerdidaPotencial(saldosCartera: SaldosCartera): PerdidaPotencial{
        let cobertura60Mas = saldosCartera.coberturasDisponibles.find( cobertura => cobertura.indicador === Indicador.icv60 )
        let cobertura120Mas = saldosCartera.coberturasDisponibles.find( cobertura => cobertura.indicador === Indicador.icv120)
        return {
            porcentajeCobertura120Mas: cobertura120Mas ? cobertura120Mas.vlrPorcentajeCobertura : null,
            porcentajeCobertura60Mas: cobertura60Mas ? cobertura60Mas.vlrPorcentajeCobertura : null
        }
    }
}