export class ResumenOperacion{
    anioColocaion: string
    mesColocacion: string
    numeroCreditos: number
    valorDesembolso: number
    valorIngresoFianzaFija: number
    ValorIngresoFianzaVariable: number
    valorComercializacion: number
    valorDisponiblePagosGenerados: number
    valorReclamado: number
    valorCupo: number
    valorPendienteReclamar: number

    constructor({
        anioColocaion,
        mesColocacion,
        numeroCreditos,
        valorDesembolso,
        valorIngresoFianzaFija,
        ValorIngresoFianzaVariable,
        valorComercializacion,
        valorDisponiblePagosGenerados,
        valorReclamado,
        valorCupo,
        valorPendienteReclamar
    }:{
        anioColocaion: string,
        mesColocacion: string,
        numeroCreditos: number,
        valorDesembolso: number,
        valorIngresoFianzaFija: number,
        ValorIngresoFianzaVariable: number,
        valorComercializacion: number,
        valorDisponiblePagosGenerados: number,
        valorReclamado: number,
        valorCupo: number,
        valorPendienteReclamar: number,
    }){
        this.anioColocaion = anioColocaion
        this.mesColocacion = mesColocacion
        this.numeroCreditos = numeroCreditos
        this.valorDesembolso = valorDesembolso
        this.valorIngresoFianzaFija = valorIngresoFianzaFija
        this.ValorIngresoFianzaVariable = ValorIngresoFianzaVariable
        this.valorComercializacion = valorComercializacion
        this.valorDisponiblePagosGenerados = valorDisponiblePagosGenerados
        this.valorReclamado = valorReclamado
        this.valorCupo = valorCupo
        this.valorPendienteReclamar = valorPendienteReclamar
    }
}