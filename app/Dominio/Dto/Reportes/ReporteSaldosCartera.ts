export interface ReporteSaldosCartera{
    rodamientoCartera: RodamientoCartera[]
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