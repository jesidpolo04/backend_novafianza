import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Reportes/ControladorReportes'

Route.group(() => {
    Route.post('/colocacion', `${accion_path}.colocacion`)
    Route.post('/operaciones', `${accion_path}.operaciones`)
    Route.post('/saldosCartera', `${accion_path}.saldosCartera`)
}).prefix('api/v1/reportes')
