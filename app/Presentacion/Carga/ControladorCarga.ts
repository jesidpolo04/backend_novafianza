
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
    const cargado = await TblCargaDatos.findBy('car_codigo_procedimiento', CodigoProcedimiento);
    if (!cargado) {
      return response.status(400).send({
        mensaje: `No existe un registro con este codigo`
      })
    }
    let asunto = '';
    let resultado = '';
    if (Estado == 1) {
      cargado.estadoProceso = 2
      asunto = 'NOVAFIANZA S.A.S - Archivo abrobado'
      resultado = 'Archivo aprobado';
    }
    if (Estado == 0) {
      cargado.estadoProceso = 6
      asunto = 'NOVAFIANZA S.A.S - Archivo rechazado'
      resultado = 'Archivo rechazado';
    }
    cargado.save();

    const usuario = await TblUsuariosEmpresas.findBy('use_usuario', cargado.usuario);
    const fecha = cargado.fechaInicial
    const fechaCargue = `${fecha.year}-${fecha.month}-${fecha.day} ${fecha.hour}:${fecha.minute}:${fecha.second}`
    //Enviar correo
    this.enviadorEmail = new EnviadorEmailAdonis()
    this.enviadorEmail.enviarTemplate({
      asunto,
      de: Env.get('SMTP_USERNAME'),
      destinatarios: usuario?.correo!,
      alias: Env.get('EMAIL_ALIAS')

    }, new EmailNotificarCargaArchivo({
      fechaCargue,
      titulo: 'datos',
      nombre: usuario?.nombre!,
      nombreArchivo: cargado.nombre,
      numeroRadicado: cargado.id,
      resultado,
      tipoArchivo: '',
      url: `${Env.get('DOMINIO')}/Front-novafianza/dist/admin`
    }));


    return response.status(200).send({
      mensaje: `Se realizo la actualiación correctamente`
    })
  }


}
