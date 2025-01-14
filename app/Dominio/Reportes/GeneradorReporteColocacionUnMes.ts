import { DateTime } from "luxon";
import { Colocacion } from "../Datos/Entidades/Reportes/Colocacion/Colocacion";
import { FiltrosColocacion } from "../Dto/Reportes/FiltrosColocacion";
import { ReporteColocacion } from "../Dto/Reportes/ReporteColocacion";
import { RepositorioReportes } from "../Repositorios/RepositorioReportes";
import { GeneradorReporteColocacion } from "./GeneradorReporteColocacion";
import { FormatoFechas } from "../FormatoFechas";
import { Grafico, GrupoDato } from "../Dto/Reportes/Grafico";
import { MESES_SAFIX } from "./MesesSafix";
import { COLORES_GRAFICOS } from "./ColoresGraficos";
import { DEPARTAMENTOS } from "./Departamentos";

export class GeneradorReporteColocacionUnMes implements GeneradorReporteColocacion {

    constructor(private repositorio: RepositorioReportes) { }

    async generar(filtros: FiltrosColocacion): Promise<ReporteColocacion> {
        const COLOR_PRIMER_GRUPO_DATOS = '#00A4EA' //AZUL
        const COLOR_SEGUNDO_GRUPO_DATOS = '#FFAA00' //AMARILLO
        const promesaColocacion = this.repositorio.obtenerColocacion(filtros)
        const promesaColocacionAnterior = this.obtenerPeriodoAnterior(filtros)
        const [colocacion, colocacionAnterior] = await Promise.all([promesaColocacion, promesaColocacionAnterior])
        const reporte = new ReporteColocacion()
        let etiquetas: string[] = []
        let codigoMeses: string[] = []
        if (colocacion.fianzasNetas.length >= colocacionAnterior.fianzasNetas.length) {
            etiquetas = colocacion.fianzasNetas.map((fn) => MESES_SAFIX[fn.mesLote])
            codigoMeses = colocacion.fianzasNetas.map(fn => fn.mesLote)
        } else {
            etiquetas = colocacionAnterior.fianzasNetas.map((fn) => MESES_SAFIX[fn.mesLote])
            codigoMeses = colocacionAnterior.fianzasNetas.map(fn => fn.mesLote)
        }
        reporte.colocacion = new Grafico({
            etiquetas,
            grupoDatos: [],
            tipo: 'BARRAS'
        })
        reporte.fianzasNetas = new Grafico({
            etiquetas,
            grupoDatos: [],
            tipo: 'BARRAS'
        })
        reporte.creditosDesembolsados = new Grafico({
            tipo: 'BARRAS',
            grupoDatos: [],
            etiquetas: colocacion.coberturasDisponibles.map((fn) => MESES_SAFIX[fn.fechaMes]),
        })

        if (colocacion.fianzasNetas.length > 0) {
            reporte.colocacion.agregarGrupoDatos({
                datos: colocacion.fianzasNetas.map(fn => fn.valorColocacion),
                color: COLOR_PRIMER_GRUPO_DATOS,
                etiqueta: colocacion.fianzasNetas[0].anioLote
            })
            reporte.fianzasNetas.agregarGrupoDatos({
                datos: colocacion.fianzasNetas.map(fn => fn.valorFianzaNeta),
                color: COLOR_PRIMER_GRUPO_DATOS,
                etiqueta: colocacion.fianzasNetas[0].anioLote
            })
            reporte.creditosDesembolsados.agregarGrupoDatos(new GrupoDato({
                datos: colocacion.coberturasDisponibles.map(cob => cob.numeroCreditos),
                color: COLOR_PRIMER_GRUPO_DATOS,
                etiqueta: colocacion.fianzasNetas[0].anioLote
            }))
        }

        if (colocacionAnterior.fianzasNetas.length > 0) {
            reporte.colocacion.agregarGrupoDatos({
                datos: codigoMeses.map(codigoMes => {
                    let fianzaNeta = colocacionAnterior.fianzasNetas.find(fianzaNeta => fianzaNeta.mesLote === codigoMes)
                    return fianzaNeta ? fianzaNeta.valorColocacion : null
                }),
                color: COLOR_SEGUNDO_GRUPO_DATOS,
                etiqueta: colocacionAnterior.fianzasNetas[0].anioLote
            })
            reporte.fianzasNetas.agregarGrupoDatos({
                datos: codigoMeses.map(codigoMes => {
                    let fianzaNeta = colocacionAnterior.fianzasNetas.find(fianzaNeta => fianzaNeta.mesLote === codigoMes)
                    return fianzaNeta ? fianzaNeta.valorFianzaNeta : null
                }),
                color: COLOR_SEGUNDO_GRUPO_DATOS,
                etiqueta: colocacionAnterior.fianzasNetas[0].anioLote
            })
            reporte.creditosDesembolsados.agregarGrupoDatos(new GrupoDato({
                datos: colocacionAnterior.coberturasDisponibles.map(cob => cob.numeroCreditos),
                color: COLOR_SEGUNDO_GRUPO_DATOS,
                etiqueta: colocacionAnterior.fianzasNetas[0].anioLote
            }))
        }

        reporte.generos = new Grafico({
            tipo: 'DONA',
            grupoDatos: [
                new GrupoDato({
                    datos: colocacion.generos.map(gen => gen.cantidad),
                    colores: colocacion.generos.map((_, indice) => COLORES_GRAFICOS[indice % COLORES_GRAFICOS.length]),
                    etiquetas: colocacion.generos.map(gen => gen.sexo),
                })
            ]
        })

        reporte.departamentos = new Grafico({
            tipo: 'DONA',
            grupoDatos: [
                new GrupoDato({
                    datos: colocacion.departamentos.map(dep => dep.cantidad),
                    colores: colocacion.departamentos.map((_, indice) => COLORES_GRAFICOS[indice % COLORES_GRAFICOS.length]),
                    etiquetas: colocacion.departamentos.map(dep => {
                        const departamento = DEPARTAMENTOS.find(departamento => departamento.codigo === dep.codigoDepartamento)
                        return departamento ? departamento.departamento : dep.codigoDepartamento; 
                    }),
                })
            ]
        })

        reporte.coberturasDisponibles = colocacion.coberturasDisponibles
        reporte.resumen = colocacion.resumenColocacion

        return reporte
    }

    private obtenerPeriodoAnterior(filtros: FiltrosColocacion): Promise<Colocacion> {
        return this.repositorio.obtenerColocacion({
            fechaInicioCorte: DateTime.fromFormat(filtros.fechaInicioCorte, FormatoFechas.FECHA_SAFIX)
                .minus({ years: 1 }).toFormat(FormatoFechas.FECHA_SAFIX),
            fechaFinalCorte: DateTime.fromFormat(filtros.fechaFinalCorte, FormatoFechas.FECHA_SAFIX)
                .minus({ years: 1 }).toFormat(FormatoFechas.FECHA_SAFIX),
            empresa: filtros.empresa,
            producto: filtros.producto
        })
    }
}