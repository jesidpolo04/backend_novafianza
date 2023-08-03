import Env from "@ioc:Adonis/Core/Env"
import { ClienteHttp } from "App/Dominio/ClienteHttp";
import { Colocacion } from "App/Dominio/Datos/Entidades/Reportes/Colocacion/Colocacion";
import { FiltrosColocacion } from "App/Dominio/Dto/Reportes/FiltrosColocacion";
import { RepositorioReportes } from "App/Dominio/Repositorios/RepositorioReportes";
import { ColocacionSafix } from "App/Infraestructura/Dto/Reportes/ColocacionSafix";
import { MapeadorColocacionSafix } from "App/Infraestructura/Dto/Reportes/Mapeadores/MapeadorColocacionSafix";

export class RepositorioReportesSafix implements RepositorioReportes{
   private readonly BASE_URL = Env.get('URL_REPORTES_SAFIX')

   constructor(private http: ClienteHttp){}

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