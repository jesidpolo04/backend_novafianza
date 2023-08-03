import { schema, rules } from "@ioc:Adonis/Core/Validator"

export const schemaFiltroColocacion = schema.create({
    fechaInicioCorte: schema.string({trim: true}),
    fechaFinalCorte: schema.string({trim: true}),
})