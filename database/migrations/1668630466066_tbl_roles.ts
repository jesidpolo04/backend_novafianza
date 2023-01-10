import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_roles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('rol_id').primary()
      table.string('rol_nombre', 30)
      table.boolean('rol_estado')
      table.timestamp('rol_creado', { useTz: true }).defaultTo(this.now())
      table.timestamp('rol_actualizado', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
