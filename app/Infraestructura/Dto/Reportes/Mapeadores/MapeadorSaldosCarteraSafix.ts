import { Amortizacion, Cobertura, CoberturaDisponible, EvolucionSaldosCartera, FlowRate, MesMaduracion, RangosFlowRate, Reclamacion, SaldosCartera, VariablesTotales } from "App/Dominio/Datos/Entidades/Reportes/SaldosCartera/SaldosCartera";
import { SaldosCarteraSafix } from "../SaldosCarteraSafix";

export class MapeadorSaldosCarteraSafix{
    static obtenerSaldosCartera(saldosCarteraSafix: SaldosCarteraSafix): SaldosCartera{
        const saldosCartera = new SaldosCartera({
            totales: new VariablesTotales({
                iCV120mas: saldosCarteraSafix.VariablesTotales.ICV120mas,
                iCV150mas: saldosCarteraSafix.VariablesTotales.ICV150mas,
                iCV30mas: saldosCarteraSafix.VariablesTotales.ICV30mas,
                iCV60mas: saldosCarteraSafix.VariablesTotales.ICV60mas,
                numCredtitos: saldosCarteraSafix.VariablesTotales.NumCredtitos,
                plazo: saldosCarteraSafix.VariablesTotales.Plazo,
                ticketPromedio: saldosCarteraSafix.VariablesTotales.TicketPromedio,
                vlrColocaciones: saldosCarteraSafix.VariablesTotales.VlrColocaciones,
                vlrReclamaciones: saldosCarteraSafix.VariablesTotales.VlrReclamaciones,
            })
        })

        saldosCarteraSafix.SaldosCarteraCosechas.forEach( scs => {
            saldosCartera.saldosCarteraCosechas.push(new Reclamacion({
                fechaColocacion: scs.FechaColocacion,
                mesesMaduracion: scs.MesesMaduracion.map(mesMaduracionSafix => {
                    return new MesMaduracion({
                        mes: mesMaduracionSafix.Mes,
                        valor: mesMaduracionSafix.Valor
                    })
                }),
                numCreditos: scs.NumCreditos,
                plazo: scs.Plazo,
                ticket: scs.Ticket,
                vlrColocacion: scs.VlrColocacion 
            }))
        })
        saldosCartera.ordenarSaldosCarteraCosechas()

        saldosCarteraSafix.SaldosCarteraCosechaPorce.forEach( scsp => {
            saldosCartera.saldosCarteraCosechaPorce.push( new Reclamacion({
                fechaColocacion: scsp.FechaColocacion,
                mesesMaduracion: scsp.MesesMaduracion.map(mesMaduracionSafix => {
                    return new MesMaduracion({
                        mes: mesMaduracionSafix.Mes,
                        valor: mesMaduracionSafix.Valor
                    })
                }),
                numCreditos: scsp.NumCreditos,
                plazo: scsp.Plazo,
                ticket: scsp.Ticket,
                vlrColocacion: scsp.VlrColocacion 
            }))
        })

        saldosCarteraSafix.SaldosCarteraVencidos.forEach( scv => {
            saldosCartera.saldosCarteraVencidos.push( new Reclamacion({
                fechaColocacion: scv.FechaColocacion,
                mesesMaduracion: scv.MesesMaduracion.map(mesMaduracionSafix => {
                    return new MesMaduracion({
                        mes: mesMaduracionSafix.Mes,
                        valor: mesMaduracionSafix.Valor
                    })
                }),
                numCreditos: scv.NumCreditos,
                plazo: scv.Plazo,
                ticket: scv.Ticket,
                vlrColocacion: scv.VlrColocacion 
            }))
        })

        saldosCarteraSafix.Reclamaciones.forEach( rec => {
            saldosCartera.reclamaciones.push( new Reclamacion({
                fechaColocacion: rec.FechaColocacion,
                mesesMaduracion: rec.MesesMaduracion.map(mesMaduracionSafix => {
                    return new MesMaduracion({
                        mes: mesMaduracionSafix.Mes,
                        valor: mesMaduracionSafix.Valor
                    })
                }),
                numCreditos: rec.NumCreditos,
                plazo: rec.Plazo,
                ticket: rec.Ticket,
                vlrColocacion: rec.VlrColocacion 
            }))
        })

        saldosCarteraSafix.SaldosCapital.forEach( salCap => {
            saldosCartera.reclamaciones.push( new Reclamacion({
                fechaColocacion: salCap.FechaColocacion,
                mesesMaduracion: salCap.MesesMaduracion.map(mesMaduracionSafix => {
                    return new MesMaduracion({
                        mes: mesMaduracionSafix.Mes,
                        valor: mesMaduracionSafix.Valor
                    })
                }),
                numCreditos: salCap.NumCreditos,
                plazo: salCap.Plazo,
                ticket: salCap.Ticket,
                vlrColocacion: salCap.VlrColocacion 
            }))
        })

        saldosCarteraSafix.FlowRate.forEach( rangoFlowRateSafix =>{
            saldosCartera.flowRate.push(new RangosFlowRate({
                rango_0_30: rangoFlowRateSafix.Rango_0_30.map( flowRateSafix => {
                    return new FlowRate({
                        periodo: flowRateSafix.Periodo,
                        valor: flowRateSafix.Valor
                    })
                }),
                rango_31_60: rangoFlowRateSafix.Rango_31_60.map( flowRateSafix => {
                    return new FlowRate({
                        periodo: flowRateSafix.Periodo,
                        valor: flowRateSafix.Valor
                    })
                }),
                rango_61_90: rangoFlowRateSafix.Rango_61_90.map( flowRateSafix => {
                    return new FlowRate({
                        periodo: flowRateSafix.Periodo,
                        valor: flowRateSafix.Valor
                    })
                }),
                rango_91_120: rangoFlowRateSafix.Rango_91_120.map( flowRateSafix => {
                    return new FlowRate({
                        periodo: flowRateSafix.Periodo,
                        valor: flowRateSafix.Valor
                    })
                }),
                rango_121_150: rangoFlowRateSafix.Rango_121_150.map( flowRateSafix => {
                    return new FlowRate({
                        periodo: flowRateSafix.Periodo,
                        valor: flowRateSafix.Valor
                    })
                }),
                rango_151_180: rangoFlowRateSafix.Rango_151_180.map( flowRateSafix => {
                    return new FlowRate({
                        periodo: flowRateSafix.Periodo,
                        valor: flowRateSafix.Valor
                    })
                }),
                rango_181_210: rangoFlowRateSafix.Rango_181_210.map( flowRateSafix => {
                    return new FlowRate({
                        periodo: flowRateSafix.Periodo,
                        valor: flowRateSafix.Valor
                    })
                }),
                rango_211_240: rangoFlowRateSafix.Rango_211_240.map( flowRateSafix => {
                    return new FlowRate({
                        periodo: flowRateSafix.Periodo,
                        valor: flowRateSafix.Valor
                    })
                }),
                rango_241_270: rangoFlowRateSafix.Rango_241_270.map( flowRateSafix => {
                    return new FlowRate({
                        periodo: flowRateSafix.Periodo,
                        valor: flowRateSafix.Valor
                    })
                }),
                rango_271_300: rangoFlowRateSafix.Rango_271_300.map( flowRateSafix => {
                    return new FlowRate({
                        periodo: flowRateSafix.Periodo,
                        valor: flowRateSafix.Valor
                    })
                }),
                rango_301_330: rangoFlowRateSafix.Rango_301_330.map( flowRateSafix => {
                    return new FlowRate({
                        periodo: flowRateSafix.Periodo,
                        valor: flowRateSafix.Valor
                    })
                }),
                rango_331_360: rangoFlowRateSafix.Rango_331_360.map( flowRateSafix => {
                    return new FlowRate({
                        periodo: flowRateSafix.Periodo,
                        valor: flowRateSafix.Valor
                    })
                }),
                rango_361Mas: rangoFlowRateSafix.Rango_361Mas.map( flowRateSafix => {
                    return new FlowRate({
                        periodo: flowRateSafix.Periodo,
                        valor: flowRateSafix.Valor
                    })
                }),
            }))
        })
        saldosCartera.ordernarFlowRates()

        saldosCarteraSafix.Coberturas.forEach( coberturaSafix =>{
            saldosCartera.coberturas.push(new Cobertura({
                periodo: coberturaSafix.Periodo,
                vlrColocacion: coberturaSafix.VlrColocacion,
                vlrDisponiblePagosNeto: coberturaSafix.VlrDisponiblePagosNeto,
                vlrDoisponiblePagos: coberturaSafix.VlrDoisponiblePagos,
                vlrFianzasNetas: coberturaSafix.VlrFianzasNetas,
                vlrPerdidaIncurrida: coberturaSafix.VlrPerdidaIncurrida,
                vlrPerdidaPotencial: coberturaSafix.VlrPerdidaPotencial,
                vlrReclamacionPenUltMes: coberturaSafix.VlrReclamacionPenUltMes,
                vlrReclamacionUltMes: coberturaSafix.VlrReclamacionUltMes,
                vlrSaldoMoraMas120: coberturaSafix.VlrSaldoMoraMas120
            }))
        })

        saldosCarteraSafix.CoberturasDisponibles.forEach(coberturaDisponibleSafix =>{
            saldosCartera.coberturasDisponibles.push(new CoberturaDisponible({
                indicador: coberturaDisponibleSafix.Indicador,
                periodo: coberturaDisponibleSafix.Periodo,
                valor: coberturaDisponibleSafix.Valor,
                vlrDisponibleCobertura: coberturaDisponibleSafix.VlrDisponibleCobertura,
                vlrPorcentajeCobertura: coberturaDisponibleSafix.VlrPorcentajeCobertura
            }))
        })
        
        saldosCarteraSafix.EvolucionSaldosCartera.forEach( eSaldosCarteraSafix => {
            console.log(eSaldosCarteraSafix)
            saldosCartera.evolucionSaldosCartera.push(new EvolucionSaldosCartera({
                indicador: eSaldosCarteraSafix.Indicador,
                periodo: eSaldosCarteraSafix.Periodo,
                valor: eSaldosCarteraSafix.Valor,
                valorPorcentaje: eSaldosCarteraSafix.ValorPorcentaje,
                vlrDisponibleNetoCobertura: eSaldosCarteraSafix.VlrDisponibleNetoCobertura,
                vlrPorcentajeCobertura: eSaldosCarteraSafix.VlrPorcentajeCobertura
            }))
        })

        saldosCarteraSafix.Amortizacion.forEach( amortizacionSafix => {
            saldosCartera.amortizacion.push(new Amortizacion({
                fechaColocacion: amortizacionSafix.FechaColocacion,
                numCreditos: amortizacionSafix.NumCreditos,
                plazo: amortizacionSafix.Plazo,
                ticket: amortizacionSafix.Ticket,
                vlrColocacion: amortizacionSafix.VlrColocacion,
                valoresAmortizacion: amortizacionSafix.ValoresAmortizacion.map( valorAmortizacionSafix => {
                    return {
                        porcentajeAmortizacion: valorAmortizacionSafix.PorcentajeAmortizacion,
                        saldoCapital: valorAmortizacionSafix.SaldoCapital
                    }
                })
            }))
        })

        return saldosCartera
    }
}