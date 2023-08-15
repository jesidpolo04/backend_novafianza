import Env from "@ioc:Adonis/Core/Env"
import { ClienteHttp } from "App/Dominio/ClienteHttp";
import { Colocacion } from "App/Dominio/Datos/Entidades/Reportes/Colocacion/Colocacion";
import { Operaciones } from "App/Dominio/Datos/Entidades/Reportes/Operaciones/Operaciones";
import { FiltrosColocacion } from "App/Dominio/Dto/Reportes/FiltrosColocacion";
import { FiltrosOperaciones } from "App/Dominio/Dto/Reportes/FiltrosOperaciones";
import { RepositorioReportes } from "App/Dominio/Repositorios/RepositorioReportes";
import { ColocacionSafix } from "App/Infraestructura/Dto/Reportes/ColocacionSafix";
import { MapeadorColocacionSafix } from "App/Infraestructura/Dto/Reportes/Mapeadores/MapeadorColocacionSafix";
import { MapeadorOperacionesSafix } from "App/Infraestructura/Dto/Reportes/Mapeadores/MapeadorOperacionesSafix";
import { OperacionesSafix } from "App/Infraestructura/Dto/Reportes/OperacionesSafix";

export class RepositorioReportesSafix implements RepositorioReportes{
   private readonly BASE_URL = Env.get('URL_REPORTES_SAFIX')

   constructor(private http: ClienteHttp){}
    async obtenerOperaciones(filtrosOperaciones: FiltrosOperaciones): Promise<Operaciones> {
        const endpoint = 'ConsultarOperaciones/ConsultarDatosOperaciones'
        const cuerpo = {
           pEntidad: "890914526",
           pFechaInicioDesembolso: filtrosOperaciones.fechaFinalDesembolso,
           pFechaFinalDesembolso: filtrosOperaciones.fechaFinalDesembolso,
           pFechaInicioCorte: "",
           pFechaFinalCorte: "",
           pAnioColocacion: filtrosOperaciones.anioColocacion,
           pMesColocacion: filtrosOperaciones.mesColocacion,
           pTipoProducto : "353"
       }
       try{
           const operaciones = await this.http.post<OperacionesSafix>(`${this.BASE_URL}${endpoint}`, cuerpo)
           console.log('operaciones obtenida rango de fechas', filtrosOperaciones, operaciones)
           return MapeadorOperacionesSafix.obtenerOperaciones(operaciones)
       }catch(e){
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
            pTipoProducto : "353"
        }
        try{
            const colocacion = await this.http.post<ColocacionSafix>(`${this.BASE_URL}${endpoint}`, cuerpo)
            console.log('colocacion obtenida rango de fechas', filtrosColocacion, colocacion)
            return MapeadorColocacionSafix.obtenerColocacion(colocacion)
        }catch(e){
            console.error(e)
            throw e;
        }
    }

}