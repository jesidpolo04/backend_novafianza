
import { DateTime } from "luxon";
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

    ordenarFianzasNetas(){
        this.fianzasNetas.sort( (a, b) => {
            if(+a.anioLote > +b.anioLote){
                return 1;
            }
            if(+a.anioLote < +b.anioLote){
                return -1;
            }
            if(+a.anioLote === +b.anioLote){
                if(+a.mesLote > +b.mesLote){
                    return 1;
                }
                if(+a.mesLote < +b.mesLote){
                    return -1;
                }
            }
            return 0; 
        })
    }

    ordernarCoberturasDisponibles(){
        this.coberturasDisponibles.sort( (a, b) => {
            const fechaMesA = a.fechaMes.split('-')
            const fechaMesB = b.fechaMes.split('-')
            const anioA = fechaMesA[0]
            const anioB = fechaMesB[0]
            const mesA = fechaMesA[1]
            const mesB = fechaMesB[1]

            if(+anioA > +anioB){
                return 1;
            }
            if(+anioA < +anioB){
                return -1;
            }
            if(+anioA === +anioB){
                if(+mesA > +mesB){
                    return 1;
                }
                if(+mesA < +mesB){
                    return -1;
                }
            }
            return 0; 
        })
    }
}