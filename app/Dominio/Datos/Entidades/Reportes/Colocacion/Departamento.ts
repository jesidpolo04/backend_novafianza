export class Departamento{
    codigoDepartamento: string;
    cantidad:        number;
    porcentaje:      number;

    constructor({
        codigoDepartamento,
        cantidad,
        porcentaje
    }: {
        codigoDepartamento: string,
        cantidad: number,
        porcentaje: number
    }){
        this.codigoDepartamento = codigoDepartamento
        this.cantidad = cantidad
        this.porcentaje = porcentaje
    }
}