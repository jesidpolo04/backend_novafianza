import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
export default class TblCorreosOperaciones extends BaseModel {
  @column({ isPrimary: true, columnName: 'coo_id' })
  public id?: string

  @column({ columnName: 'coo_correo' }) 
  public correo: string

  @column({ columnName: 'coo_estado' }) 
  public estado: boolean

  @column.dateTime({ autoCreate: true, columnName: 'created_at' }) 
  public creado: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' }) 
  public actualizado: DateTime


}
