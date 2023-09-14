import Env from "@ioc:Adonis/Core/Env"
import { ClienteHttp } from "App/Dominio/ClienteHttp";
import { Colocacion } from "App/Dominio/Datos/Entidades/Reportes/Colocacion/Colocacion";
import { Operaciones } from "App/Dominio/Datos/Entidades/Reportes/Operaciones/Operaciones";
import { Producto } from "App/Dominio/Datos/Entidades/Reportes/Producto/Producto";
import { SaldosCartera } from "App/Dominio/Datos/Entidades/Reportes/SaldosCartera/SaldosCartera";
import { FiltrosColocacion } from "App/Dominio/Dto/Reportes/FiltrosColocacion";
import { FiltrosOperaciones } from "App/Dominio/Dto/Reportes/FiltrosOperaciones";
import { FiltrosSaldosCartera } from "App/Dominio/Dto/Reportes/FiltrosSaldosCartera";
import { RepositorioReportes } from "App/Dominio/Repositorios/RepositorioReportes";
import { ColocacionSafix } from "App/Infraestructura/Dto/Reportes/ColocacionSafix";
import { MapeadorColocacionSafix } from "App/Infraestructura/Dto/Reportes/Mapeadores/MapeadorColocacionSafix";
import { MapeadorOperacionesSafix } from "App/Infraestructura/Dto/Reportes/Mapeadores/MapeadorOperacionesSafix";
import { MapeadorSaldosCarteraSafix } from "App/Infraestructura/Dto/Reportes/Mapeadores/MapeadorSaldosCarteraSafix";
import { OperacionesSafix } from "App/Infraestructura/Dto/Reportes/OperacionesSafix";
import { ProductosSafix } from "App/Infraestructura/Dto/Reportes/ProductosSafix";
import { SaldosCarteraSafix } from "App/Infraestructura/Dto/Reportes/SaldosCarteraSafix";

export class RepositorioReportesSafix implements RepositorioReportes {
    private readonly BASE_URL = Env.get('URL_REPORTES_SAFIX')

    constructor(private http: ClienteHttp) { }

    async obtenerProductos(empresa: string): Promise<Producto[]> {
        const endpoint = 'Api/ConsultarProducto/Productos'
        const cuerpo = {
            pEntidad: empresa
        }
        const productos = await this.http.post<ProductosSafix>(`${this.BASE_URL}${endpoint}`, cuerpo)
        return productos.Productos.map( productoSafix => {
            return {
                codigoProductoAlterno: productoSafix.CodigoProductoAlterno,
                codigoProductoInterno: productoSafix.CodigoProductoInterno,
                nombreProducto: productoSafix.NombreProducto
            }
        })
    }

    async obtenerSaldosCartera(filtrosSaldosCartera: FiltrosSaldosCartera): Promise<SaldosCartera> {
        const endpoint = 'api/ConsultarSaldosCartera/SaldosCartera'
        const cuerpo = {
            pEntidad: filtrosSaldosCartera.empresa,
            pFechaInicioDesembolso: "",
            pFechaFinalDesembolso: "",
            pAnioColocacion: filtrosSaldosCartera.anioColocacion,
            pMesColocacion: filtrosSaldosCartera.mesColocacion,
            pRangoMora: filtrosSaldosCartera.alturaDeMora ?? "",
            pTienda: filtrosSaldosCartera.departamento ?? "",
            pGenero: filtrosSaldosCartera.genero ?? ""
        }
        try{
            const saldosCartera = await this.http.post<SaldosCarteraSafix>(`${this.BASE_URL}${endpoint}`, cuerpo)
            console.log(saldosCartera)
            return MapeadorSaldosCarteraSafix.obtenerSaldosCartera(saldosCartera)
        }catch(e){
            console.error(e)
            throw e;
        }
    }

    async obtenerOperaciones(filtrosOperaciones: FiltrosOperaciones): Promise<Operaciones> {
        const endpoint = 'api/ConsultarOperaciones/ConsultarDatosOperaciones'
        const cuerpo = {
            pEntidad: filtrosOperaciones.empresa,
            pFechaInicioDesembolso: filtrosOperaciones.fechaInicioDesembolso,
            pFechaFinalDesembolso: filtrosOperaciones.fechaFinalDesembolso,
            pFechaInicioCorte: "",
            pFechaFinalCorte: "",
            pAnioColocacion: filtrosOperaciones.anioColocacion,
            pMesColocacion: filtrosOperaciones.mesColocacion,
            pTipo: ""
        }
        try {
            const operaciones = await this.http.post<OperacionesSafix>(`${this.BASE_URL}${endpoint}`, cuerpo)
            console.log(operaciones)
            return MapeadorOperacionesSafix.obtenerOperaciones(operaciones)
        } catch (e) {
            console.error(e)
            throw e;
        }
    }

    async obtenerColocacion(filtrosColocacion: FiltrosColocacion): Promise<Colocacion> {
        const endpoint = 'api/ConsultarColocacion/ConsultarDatosColocacion'
        const cuerpo = {
            pEntidad: filtrosColocacion.empresa,
            pFechaInicioDesembolso: "",
            pFechaFinalDesembolso: "",
            pFechaInicioCorte: filtrosColocacion.fechaInicioCorte,
            pFechaFinalCorte: filtrosColocacion.fechaFinalCorte,
            pAnioColocacion: "",
            pMesColocacion: "",
            pTipoProducto: filtrosColocacion.producto
        }
        try {
            const colocacion = await this.http.post<ColocacionSafix>(`${this.BASE_URL}${endpoint}`, cuerpo)
            console.log('filtros', filtrosColocacion, 'colocacion', colocacion)
            return MapeadorColocacionSafix.obtenerColocacion(colocacion)
        } catch (e) {
            console.error(e)
            throw e;
        }
    }

}