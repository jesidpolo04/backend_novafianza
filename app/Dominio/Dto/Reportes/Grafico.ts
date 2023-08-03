export class Grafico {
    tipo: string
    grupoDatos: GrupoDato[]
    etiquetas?: string[]

    constructor({
        tipo,
        grupoDatos,
        etiquetas
    }: {
        tipo: string,
        grupoDatos: GrupoDato[],
        etiquetas?: string[]
    }) {
        this.tipo = tipo
        this.grupoDatos = grupoDatos
        this.etiquetas = etiquetas
    }

    agregarGrupoDatos(grupoDato: GrupoDato){
        this.grupoDatos.push(grupoDato)
    }
}

export class GrupoDato {
    etiqueta?: string
    etiquetas?: string[]
    color?: string
    colores?: string[]
    datos: (number | null)[]

    constructor({
        etiqueta,
        etiquetas,
        color,
        colores,
        datos,
    }: {
        etiqueta?: string,
        etiquetas?: string[],
        color?: string,
        colores?: string[],
        datos: number[]
    }) {
        this.etiqueta = etiqueta
        this.etiquetas = etiquetas
        this.color = color
        this.colores = colores
        this.datos = datos
    }
}