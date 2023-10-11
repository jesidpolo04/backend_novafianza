import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'columnas_carga_datos'

  public async up () {
    this.schema.alterTable('tbl_carga_datos', (table) => {
      table.integer('car_codigo_procedimiento')
      table.string('car_descripcion_procedimiento')
    })
  }

  public async down () {
    this.schema.alterTable('tbl_carga_datos', (table) => {
      table.dropColumn('car_codigo_procedimiento')
      table.dropColumn('car_descripcion_procedimiento')  
  })
  }
}
