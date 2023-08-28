import Env from "@ioc:Adonis/Core/Env"
import { ClienteHttp } from "App/Dominio/ClienteHttp";
import { Colocacion } from "App/Dominio/Datos/Entidades/Reportes/Colocacion/Colocacion";
import { Operaciones } from "App/Dominio/Datos/Entidades/Reportes/Operaciones/Operaciones";
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
import { SaldosCarteraSafix } from "App/Infraestructura/Dto/Reportes/SaldosCarteraSafix";
import { saldosCarteraSafixMock } from "App/Infraestructura/Utils/MockSaldosCartera";

export class RepositorioReportesSafix implements RepositorioReportes {
    private readonly BASE_URL = Env.get('URL_REPORTES_SAFIX')

    constructor(private http: ClienteHttp) { }

    async obtenerSaldosCartera(filtrosSaldosCartera: FiltrosSaldosCartera): Promise<SaldosCartera> {
        const endpoint = 'ConsultarSaldosCartera/SaldosCartera'
        const cuerpo = {
            pEntidad: "890914526",
            pFechaInicioDesembolso: "",
            pFechaFinalDesembolso: "",
            pAnioColocacion: filtrosSaldosCartera.anioColocacion,
            pMesColocacion: filtrosSaldosCartera.mesColocacion,
            pRangoMora: filtrosSaldosCartera.alturaDeMora ?? "",
            pTienda: filtrosSaldosCartera.departamento ?? "",
            pGenero: filtrosSaldosCartera.genero ?? ""
        }
        try{
            /* const saldosCartera = await this.http.post<SaldosCarteraSafix>(`${this.BASE_URL}${endpoint}`, cuerpo) */
            let saldosCartera = saldosCarteraSafixMock;
            console.log('saldos obtenidos con filtros', filtrosSaldosCartera, saldosCartera)
            return MapeadorSaldosCarteraSafix.obtenerSaldosCartera(saldosCartera)
        }catch(e){
            console.error(e)
            throw e;
        }
    }

    async obtenerOperaciones(filtrosOperaciones: FiltrosOperaciones): Promise<Operaciones> {
        const endpoint = 'ConsultarOperaciones/ConsultarDatosOperaciones'
        const cuerpo = {
            pEntidad: "890914526",
            pFechaInicioDesembolso: filtrosOperaciones.fechaInicioDesembolso,
            pFechaFinalDesembolso: filtrosOperaciones.fechaFinalDesembolso,
            pFechaInicioCorte: "",
            pFechaFinalCorte: "",
            pAnioColocacion: filtrosOperaciones.anioColocacion,
            pMesColocacion: filtrosOperaciones.mesColocacion,
            pTipoProducto: "353"
        }
        try {
            const operaciones = await this.http.post<OperacionesSafix>(`${this.BASE_URL}${endpoint}`, cuerpo)
            console.log('operaciones obtenida rango de fechas', filtrosOperaciones, operaciones)
            return MapeadorOperacionesSafix.obtenerOperaciones(operaciones)
        } catch (e) {
            console.error(e)
            throw e;
        }
    }

    async obtenerColocacion(filtrosColocacion: FiltrosColocacion): Promise<Colocacion> {
        const endpoint = 'ConsultarColocacion/ConsultarDatosColocacion'
        const cuerpo = {
            pEntidad: "890914526",
            pFechaInicioDesembolso: "",
            pFechaFinalDesembolso: "",
            pFechaInicioCorte: filtrosColocacion.fechaInicioCorte,
            pFechaFinalCorte: filtrosColocacion.fechaFinalCorte,
            pAnioColocacion: "",
            pMesColocacion: "",
            pTipoProducto: "353"
        }
        try {
            const colocacion = await this.http.post<ColocacionSafix>(`${this.BASE_URL}${endpoint}`, cuerpo)
            console.log('colocacion obtenida rango de fechas', filtrosColocacion, colocacion)
            return MapeadorColocacionSafix.obtenerColocacion(colocacion)
        } catch (e) {
            console.error(e)
            throw e;
        }
    }

}