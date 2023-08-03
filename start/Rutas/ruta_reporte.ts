import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Reportes/ControladorReportes'

Route.group(() => {
    Route.post('/colocacion', `${accion_path}.colocacion`)
}).prefix('api/v1/reportes')
