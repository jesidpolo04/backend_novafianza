
import { ServicioCarga } from 'App/Dominio/Datos/Servicios/ServicioCarga'
import { RepositorioCargaDB } from '../../Infraestructura/Implementacion/Lucid/RepositorioCargaDB'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { ServicioAutenticacionJWT } from '../../Dominio/Datos/Servicios/ServicioJWT';
import { ServicioUsuario } from "App/Dominio/Datos/Servicios/ServicioUsuario";
import { RepositorioUsuarioNovafianzaDB } from '../../Infraestructura/Implementacion/Lucid/RepositorioUsuarioNovafianzaDB';
import { RepositorioUsuarioEmpresaDB } from '../../Infraestructura/Implementacion/Lucid/RepositorioUsuarioEmpresaDB';
import TblCargaDatos from 'App/Infraestructura/Datos/Entidad/CargaDato';
import { EnviadorEmailAdonis } from 'App/Infraestructura/Email/EnviadorEmailAdonis';
import { EnviadorEmail } from 'App/Dominio/Email/EnviadorEmail';
import { EmailNotificarCargaArchivo } from 'App/Dominio/Email/Emails/EmailNotificarCargaArchivo';
import Env from '@ioc:Adonis/Core/Env';
import TblUsuariosEmpresas from 'App/Infraestructura/Datos/Entidad/UsuarioEmpresa';
import TblCorreosOperaciones from 'App/Infraestructura/Datos/Entidad/CorreosOperaciones';
export default class ControladorCarga {
  private servicioUsuario: ServicioUsuario;
  private servicio: ServicioCarga;
  private enviadorEmail: EnviadorEmail;
  constructor() {
    this.servicio = new ServicioCarga(new RepositorioCargaDB())
    this.servicioUsuario = new ServicioUsuario(new RepositorioUsuarioNovafianzaDB(), new RepositorioUsuarioEmpresaDB())
  }

  public async cargar({ request, response }) {
    try {
      const formatos: string[] = ['txt', 'csv', 'pdf']
      const datos = request.all();
      const archivo = request.file('archivo', {
        extnames: ['txt', 'csv', 'pdf'],
      })
      if (!archivo) {
        return response.status(400).send({ mensaje: 'No se encontro archivo' })
      }

      if (!archivo.isValid) {
        return response.status(415).send({ mensaje: `Formato inválido: no se puede cargar el archivo seleccionado. Inténtalo nuevamnte, los tipos de archivos permitidos son ${formatos}` })
      }

      let token = request.header('Authorization').split(' ')[1]
      const { documento, idEmpresa } = ServicioAutenticacionJWT.obtenerPayload(token)
      datos['usuario'] = documento
      datos['idEmpresa'] = idEmpresa



      this.servicio.procesarArchivo(archivo, JSON.stringify(datos))
      return response.status(202).send({ mensaje: 'El archivo se esta procesado, puede consultar el resumen en el historial de carga' })

    } catch (error) {
      return error
    }
  }

  public async cargados({ request, response }: HttpContextContract) {
    const datos = request.all()
    let token: any = request.header('Authorization')?.split(' ')[1]
    const { documento } = ServicioAutenticacionJWT.obtenerPayload(token)
    datos['usuario'] = documento

    const usuario = await this.servicioUsuario.obtenerUsuario(datos.usuario)
    if (!datos.entidadId && usuario['idEmpresa']) datos.entidadId = usuario['idEmpresa']

    if (usuario['idEmpresa'] && datos.entidadId != usuario['idEmpresa']) {
      return response.status(400).send({ mensaje: 'No tiene autorizacion para realizar esta consulta' })
    }

    const archivos = await this.servicio.archivosCargados(JSON.stringify(datos))
    if (Object.keys(archivos).length !== 0) {
      response.status(202).send(archivos)
    } else {
      response.status(400).send({ mensaje: 'Se presento un error al consultar los archivos' })
    }
  }

  public async logs({ request, response }: HttpContextContract) {
    const logs = await this.servicio.obtenerLogs(JSON.stringify(request.all()))

    if (Object.keys(logs).length !== 0) {
      response.status(202).send(logs)
    } else {
      response.status(400).send({ mensaje: 'Se presento un error al consultar los logs' })
    }
  }

  public async buscar({ request, response }: HttpContextContract) {
    const datos = request.all();
    let token: any = request.header('Authorization')?.split(' ')[1]
    const { documento } = ServicioAutenticacionJWT.obtenerPayload(token)
    datos['usuario'] = documento

    const usuario = await this.servicioUsuario.obtenerUsuario(datos.usuario)
    if (!datos.entidadId && usuario['idEmpresa']) datos.entidadId = usuario['idEmpresa']


    if (usuario['idEmpresa'] && datos.entidadId != usuario['idEmpresa']) {
      return response.status(400).send({ mensaje: 'No tiene autorizacion para realizar esta consulta' })
    }

    const archivos = await this.servicio.buscarCargados(JSON.stringify(datos))

    if (Object.keys(archivos).length !== 0) {
      response.status(202).send(archivos)
    } else {
      response.status(400).send({ mensaje: 'Se presento un error al consultar los archivos' })
    }
  }

  public async validar({ request, response }: HttpContextContract) {
    const { CodigoProcedimiento, Estado, Descripcion } = request.all();

    if (!CodigoProcedimiento || !Descripcion) {
      return response.status(400).send({
        mensaje: `Todos los campos son obligatorios`
      })
    }

    if (Estado != 1 && Estado != 0) {
      return response.status(400).send({
        mensaje: `Codigo de estado incorrecto (1 : Aprobado, 0 : Rechazado)`
      })
    }
    const cargados = await TblCargaDatos.query().preload('archivo').where({'car_codigo_procedimiento': CodigoProcedimiento, 'car_estado_proceso_id':5});
   
    if (Object.keys(cargados).length === 0) {
      return response.status(400).send({
        mensaje: `No existen registros con este codigo sin validar`
      })  
    }

    //let archivosSubidos = new Array();
    let ultimoRadicado;
    let ultimaFecha
   /*  cargados.forEach(cargado => {
      archivosSubidos = `${cargado.archivo.nombre}, ${archivosSubidos} `
    });
     */
    const archivosSubidos =  new Array();
const nombresUnicos = new Set(); // Utilizar un Set para almacenar nombres únicos

for (let i = 0; i < cargados.length; i++) {
  const nombreArchivo = cargados[i].archivo.nombre;

  if (!nombresUnicos.has(nombreArchivo)) {
    archivosSubidos.push(nombreArchivo);
    nombresUnicos.add(nombreArchivo); // Agregar el nombre al conjunto de nombres únicos

  }
  if (i === cargados.length - 1) {
    ultimaFecha = cargados[i].createdAt;
    ultimoRadicado = cargados[i].id;
  }
}

    let asunto = '';
    let resultado = '';
    let estadoProceso;
    let descripcionProceso;
    if (Estado == 1) {
      estadoProceso = 2
      descripcionProceso = Descripcion
      asunto = 'NOVAFIANZA S.A.S - Archivo abrobado QA'
      resultado = 'Archivo aprobado';
    }
    if (Estado == 0) {
      estadoProceso = 6
      descripcionProceso = Descripcion
      asunto = 'NOVAFIANZA S.A.S - Archivo rechazado QA'
      resultado = 'Archivo rechazado';
    }


    await TblCargaDatos.query()
    .where({'car_codigo_procedimiento': CodigoProcedimiento, 'car_estado_proceso_id': 5})
    .update({
      'car_estado_proceso_id': estadoProceso,
      'car_descripcion_procedimiento': descripcionProceso
    });
  

 /*   

    let asunto = '';
    let resultado = '';
    if (Estado == 1) {
      cargado.estadoProceso = 2
      cargado.descripcionProcedimeinto = Descripcion
      asunto = 'NOVAFIANZA S.A.S - Archivo abrobado QA'
      resultado = 'Archivo aprobado';
    }
    if (Estado == 0) {
      cargado.estadoProceso = 6
      cargado.descripcionProcedimeinto = Descripcion
      asunto = 'NOVAFIANZA S.A.S - Archivo rechazado QA'
      resultado = 'Archivo rechazado';
    }
    cargado.save();
 */
    const usuario = await TblUsuariosEmpresas.findBy('use_usuario', cargados[0].usuario);
    const fecha = ultimaFecha
    const fechaCargue = `${fecha.year}-${fecha.month}-${fecha.day} ${fecha.hour}:${fecha.minute}:${fecha.second}`
    //Enviar correo
    const administradores = await TblUsuariosEmpresas.query().where({ 'use_empresa_id': usuario?.idEmpresa, 'use_rol_id': '003', 'use_estado': true })
    const correos = new Array();

    if (administradores) {
      for (const administrador of administradores) {
        correos.push(administrador.correo);
      }
    }
    correos.push(usuario?.correo);

    const correosOperaciones = await TblCorreosOperaciones.query().where('coo_estado', true);
      if (correosOperaciones) {
        correosOperaciones.forEach(correoOperacion => {
          correos.push(correoOperacion.correo);
        });
      }

    this.enviadorEmail = new EnviadorEmailAdonis()
    this.enviadorEmail.enviarTemplate({
      asunto,
      de: Env.get('SMTP_USERNAME'),
      destinatarios: correos,
      alias: Env.get('EMAIL_ALIAS')

    }, new EmailNotificarCargaArchivo({
      fechaCargue,
      titulo: 'datos',
      nombre: usuario?.nombre!,
      nombreArchivo: archivosSubidos.toString(),
      numeroRadicado: ultimoRadicado,
      resultado,
      tipoArchivo: archivosSubidos.toString(),
      url: `${Env.get('DOMINIO')}/Front-novafianza/dist/admin`
    }));


    return response.status(200).send({
      mensaje: `Se realizo la actualización correctamente`
    })
  }


}
