import { SignalEnum } from "../_enums/SignalEnum";

export class ColaboradorMinimalViewModel {
    id?: string;
    nome: string;
    cargo: string;
    signal: SignalEnum;
    imagem?: string; 
}
