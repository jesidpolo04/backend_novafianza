import { Operaciones } from "App/Dominio/Datos/Entidades/Reportes/Operaciones/Operaciones";
import { OperacionesSafix } from "../OperacionesSafix";
import { ResumenOperacion } from "App/Dominio/Datos/Entidades/Reportes/Operaciones/ResumenOperacion";

export class MapeadorOperacionesSafix{
    static obtenerOperaciones(operacionesSafix: OperacionesSafix): Operaciones{
        let operaciones = new Operaciones({
            valorColocacion: operacionesSafix.ValorColocacion,
            valorDisponibleVigente: operacionesSafix.ValorDisponibleVigente,
            valorReclamadoTotal: operacionesSafix.ValorReclamadoTotal,
            valorRecuperado: operacionesSafix.ValorRecuperado,
        })
        operacionesSafix.ResumOperaciones.forEach( resumenOperacion => {
            operaciones.agregarResumenOperacion( new ResumenOperacion({
                anioColocaion: resumenOperacion.AnioColocacion,
                mesColocacion: resumenOperacion.MesColocacion,
                numeroCreditos: resumenOperacion.NumCreditos,
                valorComercializacion: resumenOperacion.ValorComercializacion,
                valorCupo: resumenOperacion.ValorCupo,
                valorDesembolso: resumenOperacion.ValorDesembolso,
                valorDisponiblePagosGenerados: resumenOperacion.VlrDisponiblePagosGenerados,
                valorIngresoFianzaFija: resumenOperacion.ValorIngresoFianzaFija,
                ValorIngresoFianzaVariable: resumenOperacion.ValorOIngresoFianzaVariable,
                valorPendienteReclamar: resumenOperacion.ValorPendienteReclamar,
                valorReclamado: resumenOperacion.ValorReclamado
            }))
        })
        return operaciones
    }
}