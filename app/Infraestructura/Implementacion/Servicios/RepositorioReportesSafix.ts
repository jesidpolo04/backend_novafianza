import { Colocacion } from "App/Dominio/Datos/Entidades/Reportes/Colocacion/Colocacion";
import { FiltrosColocacion } from "App/Dominio/Dto/Reportes/FiltrosColocacion";
import { RepositorioReportes } from "App/Dominio/Repositorios/RepositorioReportes";
import { ColocacionSafix } from "App/Infraestructura/Dto/Reportes/ColocacionSafix";
import { MapeadorColocacionSafix } from "App/Infraestructura/Dto/Reportes/Mapeadores/MapeadorColocacionSafix";

export class RepositorioReportesSafix implements RepositorioReportes{

    async obtenerColocacion(filtrosColocacion: FiltrosColocacion): Promise<Colocacion> {
        const colocacion: ColocacionSafix = {
            "NumCreditos":98611.0,
            "NumClientes":66696.0,
            "TicketPromedio":566376.95,
            "PlazoPromedioPnderado":13.32,
            "CreditosPorCliente":1.48,
            "CoberSobreColocacion":0.30,
            "CreditoMax":6843000.0,
            "VrColocaVariacionMesAnterior":0.0,
            "VrColocaVariacionAnioAnterior":0.0,
            "VrColocaVariacionRangoAnterior":0.0,
            "FianzasNetas":[
               {
                  "AnioLote":"2021",
                  "MesLote":"11",
                  "ValorColocacion":18470124316.0,
                  "ValorFianzasNetas":18370624516.0,
                  "ValorCobertura":0.99
               },
               {
                  "AnioLote":"2022",
                  "MesLote":"11",
                  "ValorColocacion":9707811508.0,
                  "ValorFianzasNetas":9322238402.0,
                  "ValorCobertura":0.96
               },
               {
                  "AnioLote":"2022",
                  "MesLote":"02",
                  "ValorColocacion":9455155507.0,
                  "ValorFianzasNetas":9083010442.0,
                  "ValorCobertura":0.96
               },
               {
                  "AnioLote":"2022",
                  "MesLote":"07",
                  "ValorColocacion":10968830868.0,
                  "ValorFianzasNetas":10551541960.0,
                  "ValorCobertura":0.96
               },
               {
                  "AnioLote":"2022",
                  "MesLote":"04",
                  "ValorColocacion":14326898694.0,
                  "ValorFianzasNetas":13935269167.0,
                  "ValorCobertura":0.97
               },
               {
                  "AnioLote":"2022",
                  "MesLote":"10",
                  "ValorColocacion":8788819878.0,
                  "ValorFianzasNetas":8366269544.0,
                  "ValorCobertura":0.95
               },
               {
                  "AnioLote":"2021",
                  "MesLote":"10",
                  "ValorColocacion":9476028239.0,
                  "ValorFianzasNetas":9471466946.0,
                  "ValorCobertura":1.0
               },
               {
                  "AnioLote":"2021",
                  "MesLote":"12",
                  "ValorColocacion":27904844658.0,
                  "ValorFianzasNetas":27604035171.0,
                  "ValorCobertura":0.99
               },
               {
                  "AnioLote":"2022",
                  "MesLote":"01",
                  "ValorColocacion":9101992289.0,
                  "ValorFianzasNetas":8783015250.0,
                  "ValorCobertura":0.96
               },
               {
                  "AnioLote":"2022",
                  "MesLote":"06",
                  "ValorColocacion":13413879788.0,
                  "ValorFianzasNetas":12967467244.0,
                  "ValorCobertura":0.97
               },
               {
                  "AnioLote":"2022",
                  "MesLote":"08",
                  "ValorColocacion":9629763465.0,
                  "ValorFianzasNetas":9163640085.0,
                  "ValorCobertura":0.95
               },
               {
                  "AnioLote":"2022",
                  "MesLote":"09",
                  "ValorColocacion":9813309273.0,
                  "ValorFianzasNetas":9308246545.0,
                  "ValorCobertura":0.95
               },
               {
                  "AnioLote":"2022",
                  "MesLote":"03",
                  "ValorColocacion":12574247189.0,
                  "ValorFianzasNetas":12050971749.0,
                  "ValorCobertura":0.96
               },
               {
                  "AnioLote":"2022",
                  "MesLote":"05",
                  "ValorColocacion":12148568811.0,
                  "ValorFianzasNetas":11729059644.0,
                  "ValorCobertura":0.97
               },
               {
                  "AnioLote":"2022",
                  "MesLote":"12",
                  "ValorColocacion":20698348957.0,
                  "ValorFianzasNetas":20198972623.0,
                  "ValorCobertura":0.98
               },
               {
                  "AnioLote":"2021",
                  "MesLote":"10",
                  "ValorColocacion":9476028239.0,
                  "ValorFianzasNetas":9471466946.0,
                  "ValorCobertura":1.0
               },
               {
                  "AnioLote":"2021",
                  "MesLote":"12",
                  "ValorColocacion":27904844658.0,
                  "ValorFianzasNetas":27604035171.0,
                  "ValorCobertura":0.99
               }
            ],
            "Genero":[
               {
                  "sexo":"Femenino",
                  "Cantidad":68167.0,
                  "Porcentaje":102.21
               },
               {
                  "sexo":"Masculino",
                  "Cantidad":35053.0,
                  "Porcentaje":52.56
               }
            ],
            "Departamentos":[
               {
                  "CodDepartamento":"50",
                  "Cantidad":1.0,
                  "Porcentaje":0.0
               },
               {
                  "CodDepartamento":"23",
                  "Cantidad":66.0,
                  "Porcentaje":0.0
               },
               {
                  "CodDepartamento":"68",
                  "Cantidad":3.0,
                  "Porcentaje":0.0
               },
               {
                  "CodDepartamento":"11",
                  "Cantidad":3529.0,
                  "Porcentaje":0.04
               },
               {
                  "CodDepartamento":"8",
                  "Cantidad":141.0,
                  "Porcentaje":0.0
               },
               {
                  "CodDepartamento":"73",
                  "Cantidad":11.0,
                  "Porcentaje":0.0
               },
               {
                  "CodDepartamento":"5",
                  "Cantidad":78989.0,
                  "Porcentaje":0.80
               },
               {
                  "CodDepartamento":"25",
                  "Cantidad":8.0,
                  "Porcentaje":0.0
               }
            ],
            "DisponiblesCoberturas":[
               {
                  FechaMes: '10',
                  NumeroCreditos: 1,
                  plazoPromedio: 12,
                  TicketPromedio: 21,
                  VlrColocacion: 12
               },
               {
                  FechaMes: '11',
                  NumeroCreditos: 2,
                  plazoPromedio: 12,
                  TicketPromedio: 21,
                  VlrColocacion: 12
               }
            ],
            "RespuestaMetodo":{
               "IdRetorno":2.0,
               "MensajeRetorno":"No se puede convertir un objeto DBNull en otros tipos.",
               "TrazaError":""
            }
         }
         return MapeadorColocacionSafix.obtenerColocacion(colocacion)
    }

}