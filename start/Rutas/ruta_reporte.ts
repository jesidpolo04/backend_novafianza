import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Reportes/ControladorReportes'

Route.group(() => {
    Route.post('/colocacion', `${accion_path}.colocacion`)
    Route.post('/operaciones', `${accion_path}.operaciones`)
    Route.post('/saldosCartera', `${accion_path}.saldosCartera`)
    Route.post('/productos', `${accion_path}.productos`)
    Route.get('/exportSaldosCartera', `${accion_path}.exportSaldosCartera`)
}).prefix('api/v1/reportes')
