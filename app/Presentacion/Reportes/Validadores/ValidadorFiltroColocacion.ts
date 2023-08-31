import { schema, rules } from "@ioc:Adonis/Core/Validator"

export const schemaFiltroColocacion = schema.create({
    empresa: schema.string({trim: true}),
    producto: schema.string({trim: true}),
    fechaInicioCorte: schema.string({trim: true}),
    fechaFinalCorte: schema.string({trim: true}),
})