import { OriginatorService } from '../services/originator.service';
import { Memento } from './memento';
import { isNullOrUndefined } from './util';

/**
 * Provê funcionalidade do Design Pattern Memento, disponibilizando uma forma de
 * gerenciar estados do objeto do tipo <T>.
 *
 * Contém uma lista que possuí todas __(numberOfPreviousStates = Infinity)__ ou algumas das últimas __(numberOfPreviousStates = <number>)__
 * versões anteriores do objeto do tipo <T>. Pode armazenar e recuperar estados armazenados.
 */
export class Caretaker<T> {
  /**
   * Controle utilizado pelas funções undo() e redo()
   */
  private index = 0;

  /**
   * Quantidade máxima de estados anteriores que podem ser gravados
   * ao usar a função addState().
   */
  numberOfPreviousStates = 3;

  /**
   * Quantidade de estados gravados.
   */
  get length(): number {
    return this.savedStates.length;
  }

  /**
   *  Estados salvos.
   */
  private savedStates: Memento<T>[] = [];

  constructor(private originator: OriginatorService<T>) {}

  /**
   * Grava o estado do objeto T para ser posteriormente lembrado.
   *
   * @param object Estado do objeto atual
   *
   * @usageNotes Caso a quantidade de estados salvo ultrapasse o número definido na propriedade
   * __numberOfPreviousStates__, será removido o primeiro estado para que o novo estado seja adicionado
   * em último.
   */
  toRemind(object: T): void {
    if (this.length >= this.numberOfPreviousStates) {
      this.savedStates.shift();
    }

    const memento = this.originator.storeInMemento(object);

    if (isNullOrUndefined(memento)) {
      console.error('Caretaker não deve guardar estados undefined ou nulos');
      return;
    }

    this.savedStates.push(memento);
    this.index = this.length - 1;
  }

  /**
   * Retorna o estado a partir do index
   *
   * @param index Posição do estado salvo na lista de estados
   *
   * @usageNotes Caso o index seja maior ou igual número de estados gravados, retorna null.
   * O mesmo acontece caso o index seja menor que zero.
   */
  remind(index: number): T {
    if (index >= this.length || this.index < 0) {
      return null;
    }

    return this.originator.restoreFromMemento(this.savedStates[index]);
  }

  /**
   * Retorna o estado anterior
   *
   * @usageNotes Retorna null quando não houver estados anteriores
   */
  undo(): T {
    return this.remind(this.index--);
  }

  /**
   * Retorna o estado posterior ao undo()
   *
   * @usageNotes Retorna null quando não houver estados posteriores.
   */
  redo(): T {
    return this.remind(this.index++);
  }
}
