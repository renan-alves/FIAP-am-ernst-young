import { ColaboradorMinimalViewModel } from "./ColaboradorMinimalViewModel";

export class ColaboradorViewModel extends ColaboradorMinimalViewModel {
    area: string;
    areaDeEstudo: string;
    cargo: string;
    id: string;
    idade: number;
    imagem: string;
    nome: string;
    salario: number;
    signal: number;
    team: number;
    tempoDeEmpresa: number;
    ultimoReajuste: Date;

    get getSalario(): number {
        return this.salario;
    }
    set setSalario(value: number) {
        this.salario = value;
    }
}
