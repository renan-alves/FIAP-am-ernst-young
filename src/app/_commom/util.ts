import { AngularFireStorage } from "@angular/fire/storage";
import { ColaboradorMinimalViewModel } from "../_models/ColaboradorMinimalViewModel";

/**
 * Função para verificar se um valor está Nulo ou Indefinido
 *
 * @param value Valor a ser validado
 */
export function isNullOrUndefined(value: any): boolean {
  return value === null || value === undefined;
}

export function getImages(colaboradores: ColaboradorMinimalViewModel[], afStorage: AngularFireStorage){
  colaboradores.forEach((colaborador, index) => {
    afStorage.ref('/' + colaborador.id + '.jpg').getDownloadURL().subscribe((url) => {
      colaboradores[index].imagem = url as string;
    },
      error => console.error(error)
    );
  });
}