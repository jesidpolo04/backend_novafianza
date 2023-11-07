export interface OperacionesSafix {
    ResumOperaciones:       ResumOperacion[];
    ValorColocacion:        number;
    ValorReclamadoTotal:    number;
    ValorRecuperado:        number;
    ValorDisponibleVigente: number;
    RespuestaMetodo:        RespuestaMetodo;
}

export interface RespuestaMetodo {
    IdRetorno:      number;
    MensajeRetorno: string;
    TrazaError:     string;
}

export interface ResumOperacion {
    AnioColocacion:              string;
    MesColocacion:               string;
    NumCreditos:                 number;
    ValorDesembolso:             number;
    ValorIngresoFianzaFija:      number;
    ValorOIngresoFianzaVariable: number;
    ValorComercializacion:       number;
    VlrDisponiblePagosGenerados: number;
    ValorReclamado:              number;
    ValorCupo:                   number;
    ValorPendienteReclamar:      number;
}
