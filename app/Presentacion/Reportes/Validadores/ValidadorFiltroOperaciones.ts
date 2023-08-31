import { schema, rules } from "@ioc:Adonis/Core/Validator"

export const schemaFiltroOperaciones = schema.create({
    empresa: schema.string({trim: true}),
    fechaInicioDesembolso: schema.string.optional({trim: true}),
    fechaFinalDesembolso: schema.string.optional({trim: true}),
    anioColocacion: schema.string.optional({trim: true}),
    mesColocacioon: schema.string.optional({trim: true})
})