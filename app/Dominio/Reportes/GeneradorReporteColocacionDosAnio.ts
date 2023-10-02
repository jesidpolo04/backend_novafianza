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
import { DEPARTAMENTOS } from "./Departamentos";
import { FianzaNeta } from "../Datos/Entidades/Reportes/Colocacion/FianzaNeta";
import { MESES_LOTE_SAFIX } from "./MesesLoteSafix";

export class GeneradorReporteColocacionDosAnios implements GeneradorReporteColocacion {

    constructor(private repositorio: RepositorioReportes) { }

    async generar(filtros: FiltrosColocacion): Promise<ReporteColocacion> {
        const fechaInicioOriginal = DateTime.fromFormat(filtros.fechaInicioCorte, FormatoFechas.FECHA_SAFIX)
        const fechaFinalOriginal = DateTime.fromFormat(filtros.fechaFinalCorte, FormatoFechas.FECHA_SAFIX)

        const periodoMenor = {
            fechaInicio: fechaInicioOriginal.minus({ years: 1 }),
            fechaFinal: fechaInicioOriginal.set({ month: 1, day: 1 })
        }
        const periodoMedio = {
            fechaInicio: fechaInicioOriginal.set({ month: 1, day: 1 }),
            fechaFinal: fechaInicioOriginal.plus({years: 1}).set({ month: 1, day: 1 })
        }
        const periodoMayor = {
            fechaInicio: fechaFinalOriginal.set({ month: 1, day: 1 }),
            fechaFinal: fechaFinalOriginal
        }

        const promesaColocacionMenor = this.repositorio.obtenerColocacion({
            fechaInicioCorte: periodoMenor.fechaInicio.toFormat(FormatoFechas.FECHA_SAFIX),
            fechaFinalCorte: periodoMenor.fechaFinal.toFormat(FormatoFechas.FECHA_SAFIX),
            empresa: filtros.empresa,
            producto: filtros.producto
        })
        const promesaColocacionMedio = this.repositorio.obtenerColocacion({
            fechaInicioCorte: periodoMedio.fechaInicio.toFormat(FormatoFechas.FECHA_SAFIX),
            fechaFinalCorte: periodoMedio.fechaFinal.toFormat(FormatoFechas.FECHA_SAFIX),
            empresa: filtros.empresa,
            producto: filtros.producto
        })
        const promesaColocacionMayor = this.repositorio.obtenerColocacion({
            fechaInicioCorte: periodoMayor.fechaInicio.toFormat(FormatoFechas.FECHA_SAFIX),
            fechaFinalCorte: periodoMayor.fechaFinal.toFormat(FormatoFechas.FECHA_SAFIX),
            empresa: filtros.empresa,
            producto: filtros.producto
        })
        const promesaColocacionOriginal = this.repositorio.obtenerColocacion({
            fechaInicioCorte: filtros.fechaInicioCorte,
            fechaFinalCorte: filtros.fechaFinalCorte,
            empresa: filtros.empresa,
            producto: filtros.producto
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
                    colores: colocacion.generos.map( (_, indice) => COLORES_GRAFICOS[ indice % COLORES_GRAFICOS.length ] ),
                    etiquetas: colocacion.generos.map( gen => gen.sexo ),
                }) 
            ]
        })
        reporte.departamentos = new Grafico({
            tipo: 'DONA',
            grupoDatos: [ 
                new GrupoDato({
                    datos: colocacion.departamentos.map( dep => dep.cantidad ),
                    colores: colocacion.departamentos.map( (_, indice) => COLORES_GRAFICOS[ indice % COLORES_GRAFICOS.length ] ),
                    etiquetas: colocacion.departamentos.map( dep => {
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

    private agregarColocaciones(reporte: ReporteColocacion, coloMenor: Colocacion, coloMedio: Colocacion, coloMayor: Colocacion) {
        reporte.colocacion = new Grafico({
            etiquetas: MESES,
            grupoDatos: [],
            tipo: 'LINEA'
        })
        if(coloMayor.fianzasNetas.length > 0){
            reporte.colocacion.agregarGrupoDatos({
                datos: this.generarDatosColocacion(coloMayor.fianzasNetas),
                color: '#00A4EA', //AZUL
                etiqueta: coloMayor.fianzasNetas[0].anioLote
            })
        }
        if(coloMedio.fianzasNetas.length > 0){
            reporte.colocacion.agregarGrupoDatos({
                datos: this.generarDatosColocacion(coloMedio.fianzasNetas),
                color: '#FFAA00', //AMARILLO
                etiqueta: coloMedio.fianzasNetas[0].anioLote
            })
        }
        if(coloMenor.fianzasNetas.length > 0){
            reporte.colocacion.agregarGrupoDatos({
                datos: this.generarDatosColocacion(coloMenor.fianzasNetas),
                color: '#32BEC1', //VERDE FRIO
                etiqueta: coloMenor.fianzasNetas[0].anioLote
            })
        }
    }

    private agregarFianzasNetas(reporte: ReporteColocacion, coloMenor: Colocacion, coloMedio: Colocacion, coloMayor: Colocacion) {
        reporte.fianzasNetas = new Grafico({
            etiquetas: MESES,
            grupoDatos: [],
            tipo: 'LINEA'
        })
        if(coloMayor.fianzasNetas.length > 0){
            reporte.fianzasNetas.agregarGrupoDatos({
                datos: this.generarDatosFianzasNetas(coloMayor.fianzasNetas),
                color: '#00A4EA',
                etiqueta: coloMayor.fianzasNetas[0].anioLote
            })
        }

        if(coloMedio.fianzasNetas.length > 0){
            reporte.fianzasNetas.agregarGrupoDatos({
                datos: this.generarDatosFianzasNetas(coloMedio.fianzasNetas),
                color: '#FFAA00',
                etiqueta: coloMedio.fianzasNetas[0].anioLote
            })
        }
        
        if(coloMenor.fianzasNetas.length > 0){
            reporte.fianzasNetas.agregarGrupoDatos({
                datos: this.generarDatosFianzasNetas(coloMenor.fianzasNetas),
                color: '#32BEC1',
                etiqueta: coloMenor.fianzasNetas[0].anioLote
            })
        }
    }

    private agregarCreditosDesembolsados(reporte: ReporteColocacion, coloMenor: Colocacion, coloMedio: Colocacion, coloMayor: Colocacion) {
        reporte.creditosDesembolsados = new Grafico({
            etiquetas: MESES,
            grupoDatos: [],
            tipo: 'BARRAS'
        })
        if(coloMayor.coberturasDisponibles.length > 0 && coloMayor.fianzasNetas.length > 0){
            reporte.creditosDesembolsados.agregarGrupoDatos({
                datos: this.rellenarDatosConNull( coloMayor.coberturasDisponibles.map(cob => cob.numeroCreditos), true ),
                color: COLORES_GRAFICOS[0],
                etiqueta: coloMayor.fianzasNetas[0].anioLote
            })
        }

        if(coloMedio.coberturasDisponibles.length > 0 && coloMedio.fianzasNetas.length > 0){
            reporte.creditosDesembolsados.agregarGrupoDatos({
                datos: coloMedio.coberturasDisponibles.map(cob => cob.numeroCreditos),
                color: COLORES_GRAFICOS[1],
                etiqueta: coloMedio.fianzasNetas[0].anioLote
            })
        }
        
        if(coloMenor.coberturasDisponibles.length > 0 && coloMenor.fianzasNetas.length > 0){
            reporte.creditosDesembolsados.agregarGrupoDatos({
                datos: this.rellenarDatosConNull( coloMenor.coberturasDisponibles.map(cob => cob.numeroCreditos), false ),
                color: COLORES_GRAFICOS[2],
                etiqueta: coloMenor.fianzasNetas[0].anioLote
            })
        }
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

    private generarDatosColocacion(fianzasNetas: FianzaNeta[]): (number | null)[]{
        return MESES_LOTE_SAFIX.map( mesLote => {
            const fianzaNeta = fianzasNetas.find( fianzaNeta => fianzaNeta.mesLote === mesLote )
            return fianzaNeta ? fianzaNeta.valorColocacion : null;
        })
    }

    private generarDatosFianzasNetas(fianzasNetas: FianzaNeta[]): (number | null)[]{
        return MESES_LOTE_SAFIX.map( mesLote => {
            const fianzaNeta = fianzasNetas.find( fianzaNeta => fianzaNeta.mesLote === mesLote )
            return fianzaNeta ? fianzaNeta.valorFianzaNeta : null;
        })
    }
}