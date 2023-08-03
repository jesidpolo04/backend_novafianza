export class FianzaNeta {
    anioLote: string;
    mesLote: string;
    valorColocacion: number;
    valorFianzaNeta: number;
    valorCobertura: number;

    constructor({
        anioLote,
        mesLote,
        valorColocacion,
        valorFianzaNeta,
        valorCobertura
    }: {
        anioLote: string;
        mesLote: string;
        valorColocacion: number;
        valorFianzaNeta: number;
        valorCobertura: number;
    }) {
        this.anioLote = anioLote
        this.mesLote = mesLote
        this.valorColocacion = valorColocacion
        this.valorFianzaNeta = valorFianzaNeta
        this.valorCobertura = valorCobertura
    }
}