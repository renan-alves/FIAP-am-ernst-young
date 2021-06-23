import { Injectable } from '@angular/core';
import { Memento } from '../_commom/memento';
import { isNullOrUndefined } from '../_commom/util';

/**
 * Provê a funcionalidade de atribuír e recuperar valores a partir do Memento atualmente segmentado.
 * Também é responsável por criar novos Mementos e atribuir o valor atual para eles.
 */
@Injectable({
  providedIn: 'root',
})
export class OriginatorService<T> {
  constructor() {}

  /**
   * Encapsula o estado no Memento
   *
   * @returns Retorna o Memento do objeto do tipo T encapsulado
   */
  storeInMemento(value: T): Memento<T> {
    return new Memento<T>(this.newInstance(value));
  }

  /**
   * Recupera o estado a partir do Memento
   *
   * @param memento Memento a ser restaurado
   */
  restoreFromMemento(memento: Memento<T>): T {
    return this.newInstance(memento.getSavedValue());
  }

  private newInstance(value: T): T {
    if (isNullOrUndefined(value)) {
      return null;
    }

    if (value instanceof Array) {
      const auxArray = [];
      // Para arrays, aciona o método newInstance recursivamente para tratar suas propriedades individualmente
      value.forEach((val) => auxArray.push(this.newInstance(val)));
      return (auxArray as unknown) as T;
    }

    if (typeof value === 'number' || typeof value === 'string' || typeof value === 'boolean') {
      return value;
    }

    return Object.assign({}, value);
  }
}
