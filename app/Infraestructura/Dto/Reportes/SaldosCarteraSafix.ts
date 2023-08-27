import { Indicador } from "App/Dominio/Datos/Entidades/Reportes/SaldosCartera/Indicador";

export interface SaldosCarteraSafix {
    SaldosCarteraCosechas: Reclamacion[];
    SaldosCarteraVencidos: Reclamacion[];
    Reclamaciones: Reclamacion[];
    SaldosCarteraCosechaPorce: Reclamacion[];
    SaldosCapital: Reclamacion[];
    Amortizacion: Amortizacion[];
    EvolucionSaldosCartera: EvolucionSaldosCartera[];
    CoberturasDisponibles: CoberturasDisponible[];
    Coberturas: Cobertura[];
    FlowRate: Rangos[];
    VariablesTotales: VariablesTotales;
    RespuestaMetodo: RespuestaMetodo;
}

export interface Cobertura {
    Periodo: string;
    VlrColocacion: number;
    VlrFianzasNetas: number;
    VlrDoisponiblePagos: number;
    VlrReclamacionPenUltMes: number;
    VlrReclamacionUltMes: number;
    VlrDisponiblePagosNeto: number;
    VlrPerdidaIncurrida: number;
    VlrSaldoMoraMas120: number;
    VlrPerdidaPotencial: number;
}

export interface CoberturasDisponible {
    Periodo: string;
    Indicador: Indicador;
    Valor: number;
    VlrDisponibleCobertura: number;
    VlrPorcentajeCobertura: number;
}

export interface EvolucionSaldosCartera {
    Periodo: string;
    Indicador: Indicador;
    Valor: number;
    ValorPorcentaje: number;
    VlrDisponibleNetoCobertura: number;
    VlrPorcentajeCobertura: number;
}

export interface Rangos {
    Rango_0_30: FlowRate[]
    Rango_31_60: FlowRate[]
    Rango_61_90: FlowRate[]
    Rango_91_120: FlowRate[]
    Rango_121_150: FlowRate[]
    Rango_151_180: FlowRate[]
    Rango_181_210: FlowRate[]
    Rango_211_240: FlowRate[]
    Rango_241_270: FlowRate[]
    Rango_271_300: FlowRate[]
    Rango_301_330: FlowRate[]
    Rango_331_360: FlowRate[]
    Rango_361Mas: FlowRate[]
}

export interface FlowRate {
    Periodo: string
    Valor: number
}

export interface Reclamacion {
    FechaColocacion: null | string;
    VlrColocacion: number;
    NumCreditos: number;
    Ticket: number;
    Plazo: number;
    MesesMaduracion: MesMaduracion[];
}

export interface MesMaduracion {
    Mes: string;
    Valor: number;
}

export interface VariablesTotales {
    ICV30mas: number,
    ICV60mas: number,
    ICV120mas: number,
    ICV150mas: number,
    VlrReclamaciones: number,
    VlrColocaciones: number,
    NumCredtitos: number,
    TicketPromedio: number,
    Plazo: number
}

export interface RespuestaMetodo {
    IdRetorno: number;
    MensajeRetorno: string;
    TrazaError: string;
}

export interface Amortizacion {
    FechaColocacion: string;
    VlrColocacion: number;
    NumCreditos: number;
    Ticket: number;
    Plazo: number;
    ValoresAmortizacion: ValorAmortizacion[]
}

export interface ValorAmortizacion{
    SaldoCapital: number;
    PorcentajeAmortizacion: number;
}