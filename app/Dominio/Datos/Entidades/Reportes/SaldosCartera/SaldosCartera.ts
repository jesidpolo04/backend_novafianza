import { DateTime } from "luxon";
import { Indicador } from "./Indicador";

export class SaldosCartera {
    saldosCarteraCosechas: Reclamacion[];
    saldosCarteraVencidos: Reclamacion[];
    reclamaciones: Reclamacion[];
    saldosCarteraCosechaPorce: Reclamacion[];
    saldosCapital: Reclamacion[];
    amortizacion: Amortizacion[];
    evolucionSaldosCartera: EvolucionSaldosCartera[];
    coberturasDisponibles: CoberturaDisponible[];
    coberturas: Cobertura[];
    flowRate: RangosFlowRate[];
    variablesTotales: VariablesTotales;

    constructor({
        totales
    }: {
        totales: VariablesTotales
    }) {
        this.saldosCarteraCosechas = []
        this.saldosCarteraVencidos = []
        this.reclamaciones = []
        this.saldosCarteraCosechaPorce = []
        this.saldosCapital = []
        this.amortizacion = []
        this.evolucionSaldosCartera = []
        this.coberturasDisponibles = []
        this.coberturas = []
        this.flowRate = []
        this.variablesTotales = totales
    }

    ordenarSaldosCarteraCosechas(): void {
        this.saldosCarteraCosechas.sort( (a, b) =>{
            let periodoA = a.fechaColocacion;
            let periodoB = b.fechaColocacion;
            if(!periodoA) return 1;
            if(!periodoB) return -1;
            let formatoA = periodoA.length > 5 ? "yyyyMM" : "yyyyM";  
            let formatoB = periodoB.length > 5 ? "yyyyMM" : "yyyyM";
            let fechaA = DateTime.fromFormat(periodoA, formatoA)  
            let fechaB = DateTime.fromFormat(periodoB, formatoB)
            if(fechaA > fechaB){
                return 1
            }else if(fechaB > fechaA){
                return -1
            }
            else{
                return 0
            }
        })
    }

    ordernarSaldosCarteraVencidos(): void {
        //implementar
    }

    ordenarReclamaciones(): void {
        //implementar
    }

    ordenarSaldosCarteraCosechaPorce(): void {
        //implementar
    }

    ordenarSaldosCapital(): void {
        //implementar
    }

    ordernarAmortizacion(): void {
        //implementar
    }

    ordenarEvolucionSaldosCartera(): void {
        this.evolucionSaldosCartera.sort( (a, b) => {
            let periodoA = a.periodo;
            let periodoB = b.periodo;
            if(!periodoA) return 1;
            if(!periodoB) return -1;
            let formatoA = periodoA.length > 5 ? "yyyyMM" : "yyyyM";  
            let formatoB = periodoB.length > 5 ? "yyyyMM" : "yyyyM";
            let fechaA = DateTime.fromFormat(periodoA, formatoA)  
            let fechaB = DateTime.fromFormat(periodoB, formatoB)
            if(fechaA > fechaB){
                return 1
            }else if(fechaB > fechaA){
                return -1
            }
            else{
                return 0
            }
        })
    }

    ordenarCoberturasDisponibles(): void {
        //implementar
    }

    ordenarCoberturas(): void {
        //implementar
    }

    ordernarFlowRates(): void {
        this.flowRate.sort( (a, b) =>{
            let periodoA = a.rango_0_30[0].periodo;
            let periodoB = b.rango_0_30[0].periodo;
            let formatoA = periodoA.length > 5 ? "yyyyMM" : "yyyyM";  
            let formatoB = periodoB.length > 5 ? "yyyyMM" : "yyyyM";
            let fechaA = DateTime.fromFormat(periodoA, formatoA)  
            let fechaB = DateTime.fromFormat(periodoB, formatoB)
            if(fechaA > fechaB){
                return 1
            }else if(fechaB > fechaA){
                return -1
            }
            else{
                return 0
            }
        })
    }
}

export class Cobertura {
    periodo: string;
    vlrColocacion: number;
    vlrFianzasNetas: number;
    vlrDoisponiblePagos: number;
    vlrReclamacionPenUltMes: number;
    vlrReclamacionUltMes: number;
    vlrDisponiblePagosNeto: number;
    vlrPerdidaIncurrida: number;
    vlrSaldoMoraMas120: number;
    vlrPerdidaPotencial: number;

    constructor({
        periodo,
        vlrColocacion,
        vlrFianzasNetas,
        vlrDoisponiblePagos,
        vlrReclamacionPenUltMes,
        vlrReclamacionUltMes,
        vlrDisponiblePagosNeto,
        vlrPerdidaIncurrida,
        vlrSaldoMoraMas120,
        vlrPerdidaPotencial,
    }: {
        periodo: string,
        vlrColocacion: number,
        vlrFianzasNetas: number,
        vlrDoisponiblePagos: number,
        vlrReclamacionPenUltMes: number,
        vlrReclamacionUltMes: number,
        vlrDisponiblePagosNeto: number,
        vlrPerdidaIncurrida: number,
        vlrSaldoMoraMas120: number,
        vlrPerdidaPotencial: number,
    }) {
        this.periodo = periodo
        this.vlrColocacion = vlrColocacion
        this.vlrFianzasNetas = vlrFianzasNetas
        this.vlrDoisponiblePagos = vlrDoisponiblePagos
        this.vlrReclamacionPenUltMes = vlrReclamacionPenUltMes
        this.vlrReclamacionUltMes = vlrReclamacionUltMes
        this.vlrDisponiblePagosNeto = vlrDisponiblePagosNeto
        this.vlrPerdidaIncurrida = vlrPerdidaIncurrida
        this.vlrSaldoMoraMas120 = vlrSaldoMoraMas120
        this.vlrPerdidaPotencial = vlrPerdidaPotencial
    }

}

export class CoberturaDisponible {
    periodo: string;
    indicador: Indicador;
    valor: number;
    vlrDisponibleCobertura: number;
    vlrPorcentajeCobertura: number;

    constructor({
        periodo,
        indicador,
        valor,
        vlrDisponibleCobertura,
        vlrPorcentajeCobertura,
    }: {
        periodo: string,
        indicador: Indicador,
        valor: number,
        vlrDisponibleCobertura: number,
        vlrPorcentajeCobertura: number,
    }) {
        this.periodo = periodo
        this.indicador = indicador
        this.valor = valor
        this.vlrDisponibleCobertura = vlrDisponibleCobertura
        this.vlrPorcentajeCobertura = vlrPorcentajeCobertura
    }
}

export class EvolucionSaldosCartera {
    periodo: string;
    indicador: Indicador;
    valor: number;
    valorPorcentaje: number;
    vlrDisponibleNetoCobertura: number;
    vlrPorcentajeCobertura: number;

    constructor({
        periodo,
        indicador,
        valor,
        valorPorcentaje,
        vlrDisponibleNetoCobertura,
        vlrPorcentajeCobertura,
    }: {
        periodo: string,
        indicador: Indicador,
        valor: number,
        valorPorcentaje: number,
        vlrDisponibleNetoCobertura: number,
        vlrPorcentajeCobertura: number,
    }) {
        this.periodo = periodo
        this.indicador = indicador
        this.valor = valor
        this.valorPorcentaje = valorPorcentaje
        this.vlrDisponibleNetoCobertura = vlrDisponibleNetoCobertura
        this.vlrPorcentajeCobertura = vlrPorcentajeCobertura
    }
}

export class RangosFlowRate {
    rango_0_30: FlowRate[]
    rango_31_60: FlowRate[]
    rango_61_90: FlowRate[]
    rango_91_120: FlowRate[]
    rango_121_150: FlowRate[]
    rango_151_180: FlowRate[]
    rango_181_210: FlowRate[]
    rango_211_240: FlowRate[]
    rango_241_270: FlowRate[]
    rango_271_300: FlowRate[]
    rango_301_330: FlowRate[]
    rango_331_360: FlowRate[]
    rango_361Mas: FlowRate[]

    constructor({
        rango_0_30,
        rango_31_60,
        rango_61_90,
        rango_91_120,
        rango_121_150,
        rango_151_180,
        rango_181_210,
        rango_211_240,
        rango_241_270,
        rango_271_300,
        rango_301_330,
        rango_331_360,
        rango_361Mas,
    }: {
        rango_0_30: FlowRate[],
        rango_31_60: FlowRate[],
        rango_61_90: FlowRate[],
        rango_91_120: FlowRate[],
        rango_121_150: FlowRate[],
        rango_151_180: FlowRate[],
        rango_181_210: FlowRate[],
        rango_211_240: FlowRate[],
        rango_241_270: FlowRate[],
        rango_271_300: FlowRate[],
        rango_301_330: FlowRate[],
        rango_331_360: FlowRate[],
        rango_361Mas: FlowRate[],
    }) {
        this.rango_0_30 = rango_0_30
        this.rango_31_60 = rango_31_60
        this.rango_61_90 = rango_61_90
        this.rango_91_120 = rango_91_120
        this.rango_121_150 = rango_121_150
        this.rango_151_180 = rango_151_180
        this.rango_181_210 = rango_181_210
        this.rango_211_240 = rango_211_240
        this.rango_241_270 = rango_241_270
        this.rango_271_300 = rango_271_300
        this.rango_301_330 = rango_301_330
        this.rango_331_360 = rango_331_360
        this.rango_361Mas = rango_361Mas
    }
}

export class FlowRate {
    periodo: string
    valor: number

    constructor({
        periodo,
        valor
    }: {
        periodo: string,
        valor: number
    }) {
        this.periodo = periodo
        this.valor = valor
    }
}

export class Reclamacion {
    fechaColocacion: null | string;
    vlrColocacion: number;
    numCreditos: number;
    ticket: number;
    plazo: number;
    mesesMaduracion: MesMaduracion[];

    constructor({
        fechaColocacion,
        vlrColocacion,
        numCreditos,
        ticket,
        plazo,
        mesesMaduracion
    }: {
        fechaColocacion: null | string,
        vlrColocacion: number,
        numCreditos: number,
        ticket: number,
        plazo: number,
        mesesMaduracion: MesMaduracion[],
    }) {
        this.fechaColocacion = fechaColocacion
        this.vlrColocacion = vlrColocacion
        this.numCreditos = numCreditos
        this.ticket = ticket
        this.plazo = plazo
        this.mesesMaduracion = mesesMaduracion
    }
}

export class MesMaduracion {
    mes: string;
    valor: number;

    constructor({
        mes,
        valor,
    }: {
        mes: string,
        valor: number,
    }) {
        this.mes = mes
        this.valor = valor
    }
}

export class Amortizacion {
    fechaColocacion: string;
    vlrColocacion: number;
    numCreditos: number;
    ticket: number;
    plazo: number;
    valoresAmortizacion: ValorAmortizacion[]

    constructor({
        fechaColocacion,
        vlrColocacion,
        numCreditos,
        ticket,
        plazo,
        valoresAmortizacion
    }: {
        fechaColocacion: string;
        vlrColocacion: number;
        numCreditos: number;
        ticket: number;
        plazo: number;
        valoresAmortizacion?: ValorAmortizacion[]
    }) {
        this.fechaColocacion = fechaColocacion
        this.vlrColocacion = vlrColocacion
        this.numCreditos = numCreditos
        this.ticket = ticket
        this.plazo = plazo
        this.valoresAmortizacion = valoresAmortizacion ?? []
    }
}

export class ValorAmortizacion {
    saldoCapital: number;
    porcentajeAmortizacion: number;

    constructor({
        saldoCapital,
        porcentajeAmortizacion
    }: {
        saldoCapital: number,
        porcentajeAmortizacion: number,
    }) {
        this.saldoCapital = saldoCapital
        this.porcentajeAmortizacion = porcentajeAmortizacion
    }
}

export class VariablesTotales {

    iCV30mas: number;
    iCV60mas: number;
    iCV120mas: number;
    iCV150mas: number;
    vlrReclamaciones: number;
    vlrColocaciones: number;
    numCredtitos: number;
    ticketPromedio: number;
    plazo: number;

    constructor({
        iCV30mas,
        iCV60mas,
        iCV120mas,
        iCV150mas,
        vlrReclamaciones,
        vlrColocaciones,
        numCredtitos,
        ticketPromedio,
        plazo,
    }: {
        iCV30mas: number,
        iCV60mas: number,
        iCV120mas: number,
        iCV150mas: number,
        vlrReclamaciones: number,
        vlrColocaciones: number,
        numCredtitos: number,
        ticketPromedio: number,
        plazo: number,
    }) {
        this.iCV30mas = iCV30mas
        this.iCV60mas = iCV60mas
        this.iCV120mas = iCV120mas
        this.iCV150mas = iCV150mas
        this.vlrReclamaciones = vlrReclamaciones
        this.vlrColocaciones = vlrColocaciones
        this.numCredtitos = numCredtitos
        this.ticketPromedio = ticketPromedio
        this.plazo = plazo
    }
}