import Route from '@ioc:Adonis/Core/Route'
const controlador = '../../../app/Presentacion/CorreosOperaciones/ControladorCorreosOperaciones'

Route.group(() => {
    Route.get('/', `${controlador}.listar`)
    Route.post('/', `${controlador}.crear`)
    Route.put('/:id', `${controlador}.actualizar`)
}).prefix('/api/v1/correos').middleware('autenticacionJwt')
