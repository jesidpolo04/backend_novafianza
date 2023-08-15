import { ResumenOperacion } from "./ResumenOperacion";

export class Operaciones {
    resumenOperaciones: ResumenOperacion[]
    valorColocacion: number
    valorReclamadoTotal: number
    valorRecuperado: number
    valorDisponibleVigente: number

    constructor({
        resumenOperaciones,
        valorColocacion,
        valorReclamadoTotal,
        valorRecuperado,
        valorDisponibleVigente
    }: {
        resumenOperaciones?: ResumenOperacion[],
        valorColocacion: number,
        valorReclamadoTotal: number,
        valorRecuperado: number,
        valorDisponibleVigente: number
    }) {
        this.resumenOperaciones = resumenOperaciones ?? []
        this.valorColocacion = valorColocacion
        this.valorReclamadoTotal = valorReclamadoTotal
        this.valorRecuperado = valorRecuperado
        this.valorDisponibleVigente = valorDisponibleVigente
    }

    agregarResumenOperacion(resumenOperacion: ResumenOperacion): void{
        this.resumenOperaciones.push(resumenOperacion)
    }
}