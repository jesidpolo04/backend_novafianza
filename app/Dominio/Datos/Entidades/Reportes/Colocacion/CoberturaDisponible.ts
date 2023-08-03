export class CoberturaDisponible {
    fechaMes: string;
    valorColocacion: number;
    numeroCreditos: number;
    ticketPromedio: number;
    plazoPromedio: number;

    constructor({
        fechaMes,
        valorColocacion,
        numeroCreditos,
        ticketPromedio,
        plazoPromedio
    }: {
        fechaMes: string,
        valorColocacion: number,
        numeroCreditos: number,
        ticketPromedio: number,
        plazoPromedio: number
    }) {
        this.fechaMes = fechaMes
        this.valorColocacion = valorColocacion
        this.numeroCreditos = numeroCreditos
        this.ticketPromedio = ticketPromedio
        this.plazoPromedio = plazoPromedio
    }
}