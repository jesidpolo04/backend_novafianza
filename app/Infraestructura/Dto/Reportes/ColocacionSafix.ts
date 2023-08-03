export interface ColocacionSafix {
    NumCreditos:                    number;
    NumClientes:                    number;
    TicketPromedio:                 number;
    PlazoPromedioPnderado:          number;
    CreditosPorCliente:             number;
    CoberSobreColocacion:           number;
    CreditoMax:                     number;
    VrColocaVariacionMesAnterior:   number;
    VrColocaVariacionAnioAnterior:  number;
    VrColocaVariacionRangoAnterior: number;
    FianzasNetas:                   FianzasNeta[];
    Genero:                         Genero[];
    Departamentos:                  Departamento[];
    DisponiblesCoberturas:          CoberturaDisponible[];
    RespuestaMetodo:                RespuestaMetodo;
}

export interface Departamento {
    CodDepartamento: string;
    Cantidad:        number;
    Porcentaje:      number;
}

export interface FianzasNeta {
    AnioLote:          string;
    MesLote:           string;
    ValorColocacion:   number;
    ValorFianzasNetas: number;
    ValorCobertura:    number;
}

export interface Genero {
    sexo:       string;
    Cantidad:   number;
    Porcentaje: number;
}

export interface CoberturaDisponible {
    FechaMes:       string;
    VlrColocacion:  number;
    NumeroCreditos: number;
    TicketPromedio: number;
    plazoPromedio:  number;
}

export interface RespuestaMetodo {
    IdRetorno:      number;
    MensajeRetorno: string;
    TrazaError:     string;
}