import { DateTime } from "luxon";
import { FiltrosColocacion } from "../Dto/Reportes/FiltrosColocacion";
import { ReporteColocacion } from "../Dto/Reportes/ReporteColocacion";
import { GeneradorReporteColocacion } from "./GeneradorReporteColocacion";
import { FormatoFechas } from "../FormatoFechas";
import { RepositorioReportes } from "../Repositorios/RepositorioReportes";
import { Grafico, GrupoDato } from "../Dto/Reportes/Grafico";
import { MESES } from "./MesesSafix";
import { Colocacion } from "../Datos/Entidades/Reportes/Colocacion/Colocacion";
import { COLORES_GRAFICOS } from "./ColoresGraficos";

export class GeneradorReporteColocacionDosAnios implements GeneradorReporteColocacion {

    constructor(private repositorio: RepositorioReportes) { }

    async generar(filtros: FiltrosColocacion): Promise<ReporteColocacion> {
        const fechaInicioOriginal = DateTime.fromFormat(filtros.fechaInicioCorte, FormatoFechas.FECHA_SAFIX)
        const fechaFinalOriginal = DateTime.fromFormat(filtros.fechaFinalCorte, FormatoFechas.FECHA_SAFIX)

        const periodoMenor = {
            fechaInicio: fechaInicioOriginal.minus({ years: 1 }),
            fechaFinal: fechaInicioOriginal.minus({ year: 1 }).set({ month: 12, day: 31 })
        }
        const periodoMedio = {
            fechaInicio: fechaInicioOriginal.set({ month: 1, day: 1 }),
            fechaFinal: fechaInicioOriginal.set({ month: 12, day: 31 })
        }
        const periodoMayor = {
            fechaInicio: fechaFinalOriginal.set({ month: 1, day: 1 }),
            fechaFinal: fechaFinalOriginal
        }

        const promesaColocacionMenor = this.repositorio.obtenerColocacion({
            fechaInicioCorte: periodoMenor.fechaInicio.toFormat(FormatoFechas.FECHA_SAFIX),
            fechaFinalCorte: periodoMenor.fechaFinal.toFormat(FormatoFechas.FECHA_SAFIX)
        })
        const promesaColocacionMedio = this.repositorio.obtenerColocacion({
            fechaInicioCorte: periodoMedio.fechaInicio.toFormat(FormatoFechas.FECHA_SAFIX),
            fechaFinalCorte: periodoMedio.fechaFinal.toFormat(FormatoFechas.FECHA_SAFIX)
        })
        const promesaColocacionMayor = this.repositorio.obtenerColocacion({
            fechaInicioCorte: periodoMayor.fechaInicio.toFormat(FormatoFechas.FECHA_SAFIX),
            fechaFinalCorte: periodoMayor.fechaFinal.toFormat(FormatoFechas.FECHA_SAFIX)
        })
        const promesaColocacionOriginal = this.repositorio.obtenerColocacion({
            fechaInicioCorte: filtros.fechaInicioCorte,
            fechaFinalCorte: filtros.fechaFinalCorte
        })

        const [colocacionMenor, colocacionMedio, colocacionMayor, colocacion] = await Promise.all([
            promesaColocacionMenor,
            promesaColocacionMedio,
            promesaColocacionMayor,
            promesaColocacionOriginal
        ])

        const reporte = new ReporteColocacion()
        this.agregarColocaciones(reporte, colocacionMenor, colocacionMedio, colocacionMayor)
        this.agregarFianzasNetas(reporte, colocacionMenor, colocacionMedio, colocacionMayor)
        this.agregarCreditosDesembolsados(reporte, colocacionMenor, colocacionMedio, colocacionMayor)
        
        reporte.generos = new Grafico({
            tipo: 'DONA',
            grupoDatos: [ 
                new GrupoDato({
                    datos: colocacion.generos.map( gen => gen.cantidad ),
                    colores: colocacion.generos.map( (_, indice) => COLORES_GRAFICOS[ COLORES_GRAFICOS.length % indice ] ),
                    etiquetas: colocacion.generos.map( gen => gen.sexo ),
                }) 
            ]
        })
        reporte.departamentos = new Grafico({
            tipo: 'DONA',
            grupoDatos: [ 
                new GrupoDato({
                    datos: colocacion.departamentos.map( dep => dep.cantidad ),
                    colores: colocacion.departamentos.map( (_, indice) => COLORES_GRAFICOS[ COLORES_GRAFICOS.length % indice ] ),
                    etiquetas: colocacion.departamentos.map( dep => dep.codigoDepartamento ),
                }) 
            ]
        })
        reporte.coberturasDisponibles = colocacion.coberturasDisponibles
        return reporte
    }

    private agregarColocaciones(reporte: ReporteColocacion, coloMenor: Colocacion, coloMedio: Colocacion, coloMayor: Colocacion) {
        reporte.colocacion = new Grafico({
            etiquetas: MESES,
            grupoDatos: [],
            tipo: 'LINEA'
        })
        reporte.colocacion.agregarGrupoDatos({
            datos: this.rellenarDatosConNull( coloMayor.fianzasNetas.map(fn => fn.valorColocacion), true ),
            color: COLORES_GRAFICOS[0],
            etiqueta: coloMayor.fianzasNetas[0].anioLote
        })
        reporte.colocacion.agregarGrupoDatos({
            datos: coloMedio.fianzasNetas.map(fn => fn.valorColocacion),
            color: COLORES_GRAFICOS[1],
            etiqueta: coloMedio.fianzasNetas[0].anioLote
        })
        reporte.colocacion.agregarGrupoDatos({
            datos: this.rellenarDatosConNull( coloMenor.fianzasNetas.map(fn => fn.valorColocacion), false ),
            color: COLORES_GRAFICOS[2],
            etiqueta: coloMenor.fianzasNetas[0].anioLote
        })
    }

    private agregarFianzasNetas(reporte: ReporteColocacion, coloMenor: Colocacion, coloMedio: Colocacion, coloMayor: Colocacion) {
        reporte.fianzasNetas = new Grafico({
            etiquetas: MESES,
            grupoDatos: [],
            tipo: 'LINEA'
        })
        reporte.fianzasNetas.agregarGrupoDatos({
            datos: this.rellenarDatosConNull( coloMayor.fianzasNetas.map(fn => fn.valorFianzaNeta), true ),
            color: COLORES_GRAFICOS[0],
            etiqueta: coloMayor.fianzasNetas[0].anioLote
        })
        reporte.fianzasNetas.agregarGrupoDatos({
            datos: coloMedio.fianzasNetas.map(fn => fn.valorFianzaNeta),
            color: COLORES_GRAFICOS[1],
            etiqueta: coloMedio.fianzasNetas[0].anioLote
        })
        reporte.fianzasNetas.agregarGrupoDatos({
            datos: this.rellenarDatosConNull( coloMenor.fianzasNetas.map(fn => fn.valorFianzaNeta), false ),
            color: COLORES_GRAFICOS[2],
            etiqueta: coloMenor.fianzasNetas[0].anioLote
        })
    }

    private agregarCreditosDesembolsados(reporte: ReporteColocacion, coloMenor: Colocacion, coloMedio: Colocacion, coloMayor: Colocacion) {
        reporte.creditosDesembolsados = new Grafico({
            etiquetas: MESES,
            grupoDatos: [],
            tipo: 'BARRAS'
        })
        reporte.creditosDesembolsados.agregarGrupoDatos({
            datos: this.rellenarDatosConNull( coloMayor.coberturasDisponibles.map(cob => cob.numeroCreditos), true ),
            color: COLORES_GRAFICOS[0],
            etiqueta: coloMayor.fianzasNetas[0].anioLote
        })
        reporte.creditosDesembolsados.agregarGrupoDatos({
            datos: coloMedio.coberturasDisponibles.map(cob => cob.numeroCreditos),
            color: COLORES_GRAFICOS[1],
            etiqueta: coloMedio.fianzasNetas[0].anioLote
        })
        reporte.creditosDesembolsados.agregarGrupoDatos({
            datos: this.rellenarDatosConNull( coloMenor.coberturasDisponibles.map(cob => cob.numeroCreditos), false ),
            color: COLORES_GRAFICOS[2],
            etiqueta: coloMenor.fianzasNetas[0].anioLote
        })
    }

    private rellenarDatosConNull(datos: number[], alFinal: boolean = true): (number | null)[] {
        const mesesFaltantes = 12 - datos.length
        let nulls: null[] = []
        for (let i = 0; i < mesesFaltantes; i++) {
            nulls.push(null)
        }
        if (alFinal) {
            return [ ...datos, ...nulls ]
        }else{
            return [ ...nulls, ...datos ]
        }
    }
}