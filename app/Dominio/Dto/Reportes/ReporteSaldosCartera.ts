export interface ReporteSaldosCartera{
    rodamientoCartera: RodamientoCartera[]
    cosechas: Cosechas
}

export interface RodamientoCartera{
    fechaCierre: string
    rango_0_30Dias: number | null
    rango_31_60Dias: number | null
    rango_61_90Dias: number | null
    rango_91_120Dias: number | null
    rango_121_150Dias: number | null
    rango_151_180Dias: number | null
    rango_181_210Dias: number | null
    rango_211_240Dias: number | null
    rango_241_270Dias: number | null
    rango_271_300Dias: number | null
    rango_301_330Dias: number | null
    rango_331_360Dias: number | null
    rango_361MasDias: number | null
}

export interface Cosechas{
    cabecerasMeses: string[]
    cosechas: Cosecha[]
}

export interface Cosecha{
    fecha: string
    vlrColocacion: number
    numCreditos: number
    ticket: number
    plazo: number
    saldo: number
    mesesMaduracion: MesMaduracion[]
}

export interface MesMaduracion{
    mes: string
    valor: number
}