export class Genero{
    sexo: string;
    cantidad:        number;
    porcentaje:      number;

    constructor({
        sexo,
        cantidad,
        porcentaje
    }: {
        sexo: string,
        cantidad: number,
        porcentaje: number
    }){
        this.sexo = sexo
        this.cantidad = cantidad
        this.porcentaje = porcentaje
    }
}