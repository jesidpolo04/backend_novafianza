import { schema, rules } from "@ioc:Adonis/Core/Validator"

export const schemaFiltrosSaldosCartera = schema.create({
    empresa: schema.string({trim: true}),
    anioColocacion: schema.string({trim: true}),
    mesColocacion: schema.string({trim: true}),
    genero: schema.string.optional({trim: true}),
    departamento: schema.string.optional({trim: true}),
    alturaDeMora: schema.string.optional({trim: true})
})