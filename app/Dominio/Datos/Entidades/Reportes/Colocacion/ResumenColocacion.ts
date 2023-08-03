export class ResumenColocacion {
    numeroCreditos: number;
    numeroClientes: number;
    ticketPromedio: number;
    plazoPromedioPonderado: number;
    creditosPorCliente: number;
    coberturaSobreColocacion: number;
    creditoMaximo: number;
    variacionMesAnterior: number;
    variacionAnioAnterior: number;
    variacionRangoAnterior: number;

    constructor({
        numeroCreditos ,
        numeroClientes ,
        ticketPromedio ,
        plazoPromedioPonderado ,
        creditosPorCliente ,
        coberturaSobreColocacion ,
        creditoMaximo ,
        variacionMesAnterior ,
        variacionAnioAnterior ,
        variacionRangoAnterior 
    }:{
        numeroCreditos: number,
        numeroClientes: number,
        ticketPromedio: number,
        plazoPromedioPonderado: number,
        creditosPorCliente: number,
        coberturaSobreColocacion: number,
        creditoMaximo: number,
        variacionMesAnterior: number,
        variacionAnioAnterior: number,
        variacionRangoAnterior: number,
    }) {
        this.numeroCreditos = numeroCreditos
        this.numeroClientes = numeroClientes
        this.ticketPromedio = ticketPromedio
        this.plazoPromedioPonderado = plazoPromedioPonderado
        this.creditosPorCliente = creditosPorCliente
        this.coberturaSobreColocacion = coberturaSobreColocacion
        this.creditoMaximo = creditoMaximo
        this.variacionMesAnterior = variacionMesAnterior
        this.variacionAnioAnterior = variacionAnioAnterior
        this.variacionRangoAnterior = variacionRangoAnterior
    }
}