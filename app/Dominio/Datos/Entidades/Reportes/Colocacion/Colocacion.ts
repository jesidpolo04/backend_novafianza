
import { CoberturaDisponible } from "./CoberturaDisponible";
import { Departamento } from "./Departamento";
import { FianzaNeta } from "./FianzaNeta";
import { Genero } from "./Genero";
import { ResumenColocacion } from "./ResumenColocacion";

export class Colocacion{
    public resumenColocacion: ResumenColocacion
    public fianzasNetas: FianzaNeta[]
    public departamentos: Departamento[]
    public generos: Genero[]
    public coberturasDisponibles: CoberturaDisponible[]

    constructor(resumenColocacion: ResumenColocacion){
        this.resumenColocacion = resumenColocacion
        this.fianzasNetas = []
        this.departamentos = []
        this.generos = []
        this.coberturasDisponibles = []
    }

    agregarFianzaNeta(fianzaNeta: FianzaNeta){
        this.fianzasNetas.push(fianzaNeta)
    }

    agregarDepartamento(departamento: Departamento){
        this.departamentos.push(departamento)
    }

    agregarGenero(genero: Genero){
        this.generos.push(genero)
    }

    agregarCoberturaDisponible(cobertura: CoberturaDisponible){
        this.coberturasDisponibles.push(cobertura)
    }
}