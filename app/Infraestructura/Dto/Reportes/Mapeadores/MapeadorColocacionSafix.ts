import { Colocacion } from "App/Dominio/Datos/Entidades/Reportes/Colocacion/Colocacion";
import { ColocacionSafix } from "../ColocacionSafix";
import { FianzaNeta } from "App/Dominio/Datos/Entidades/Reportes/Colocacion/FianzaNeta";
import { Departamento } from "App/Dominio/Datos/Entidades/Reportes/Colocacion/Departamento";
import { Genero } from "App/Dominio/Datos/Entidades/Reportes/Colocacion/Genero";
import { CoberturaDisponible } from "App/Dominio/Datos/Entidades/Reportes/Colocacion/CoberturaDisponible";

export class MapeadorColocacionSafix {
    static obtenerColocacion(colocacionSafix: ColocacionSafix): Colocacion {
        const colocacion = new Colocacion({
            valorColocacion: colocacionSafix.vlrColocacion,
            coberturaSobreColocacion: colocacionSafix.CoberSobreColocacion,
            creditoMaximo: colocacionSafix.CreditoMax,
            creditosPorCliente: colocacionSafix.CreditosPorCliente,
            numeroClientes: colocacionSafix.NumClientes,
            numeroCreditos: colocacionSafix.NumCreditos,
            plazoPromedioPonderado: colocacionSafix.PlazoPromedioPnderado,
            ticketPromedio: colocacionSafix.TicketPromedio,
            variacionAnioAnterior: colocacionSafix.VrColocaVariacionAnioAnterior,
            variacionMesAnterior: colocacionSafix.VrColocaVariacionMesAnterior,
            variacionRangoAnterior: colocacionSafix.VrColocaVariacionRangoAnterior
        })

        colocacionSafix.FianzasNetas.forEach(fn => {
            colocacion.agregarFianzaNeta(new FianzaNeta({
                anioLote: fn.AnioLote,
                mesLote: fn.MesLote,
                valorCobertura: fn.ValorCobertura,
                valorColocacion: fn.ValorColocacion,
                valorFianzaNeta: fn.ValorFianzasNetas
            }))
        })

        colocacionSafix.Departamentos.forEach(dep => {
            colocacion.agregarDepartamento(new Departamento({
                cantidad: dep.Cantidad,
                codigoDepartamento: dep.CodDepartamento,
                porcentaje: dep.Porcentaje
            }))
        })

        colocacionSafix.Genero.forEach(gen => {
            colocacion.agregarGenero(new Genero({
                cantidad: gen.Cantidad,
                porcentaje: gen.Porcentaje,
                sexo: gen.sexo
            }))
        })

        colocacionSafix.DisponiblesCoberturas.forEach(cob => {
            colocacion.agregarCoberturaDisponible(new CoberturaDisponible({
                fechaMes: cob.FechaMes,
                numeroCreditos: cob.NumeroCreditos,
                plazoPromedio: cob.plazoPromedio,
                ticketPromedio: cob.TicketPromedio,
                valorColocacion: cob.VlrColocacion,
                saldo: cob.Saldo,
                valorDisponibleFianzaFija: cob.VlrDisponibleFianzaFija,
                valorDisponibleFianzaVariable: cob.VlrDisponibleFianzaVariable,
                valorTotalDisponible: cob.VlrTotalDisponible,
                valorTotalDisponibleColocacion: cob.VlrTotalDisponibleColocacion,
            }))
        })

        colocacion.ordenarFianzasNetas()

        return colocacion
    }
}