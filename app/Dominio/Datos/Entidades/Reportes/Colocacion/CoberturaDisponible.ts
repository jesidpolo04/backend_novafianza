export class CoberturaDisponible {
    fechaMes: string;
    valorColocacion: number;
    numeroCreditos: number;
    ticketPromedio: number;
    plazoPromedio: number;
    saldo: number;
    valorDisponibleFianzaFija: number;
    valorDisponibleFianzaVariable: number;
    valorTotalDisponible: number;
    valorTotalDisponibleColocacion: number;


    constructor({
        fechaMes,
        valorColocacion,
        numeroCreditos,
        ticketPromedio,
        plazoPromedio,
        saldo,
        valorDisponibleFianzaFija,
        valorDisponibleFianzaVariable,
        valorTotalDisponible,
        valorTotalDisponibleColocacion
    }: {
        fechaMes: string,
        valorColocacion: number,
        numeroCreditos: number,
        ticketPromedio: number,
        plazoPromedio: number,
        saldo: number;
        valorDisponibleFianzaFija: number;
        valorDisponibleFianzaVariable: number;
        valorTotalDisponible: number;
        valorTotalDisponibleColocacion: number;

    }) {
        this.fechaMes = fechaMes
        this.valorColocacion = valorColocacion
        this.numeroCreditos = numeroCreditos
        this.ticketPromedio = ticketPromedio
        this.plazoPromedio = plazoPromedio
        this.saldo = saldo
        this.valorDisponibleFianzaFija = valorDisponibleFianzaFija
        this.valorDisponibleFianzaVariable = valorDisponibleFianzaVariable
        this.valorTotalDisponible = valorTotalDisponible
        this.valorTotalDisponibleColocacion = valorTotalDisponibleColocacion
    }
}