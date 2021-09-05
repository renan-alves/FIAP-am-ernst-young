/**
 * O objeto básico que é armazenado em diferentes estados
 */
 export class Memento<T> {
    constructor(private value: T) {}
  
    /**
     * Recupera o estado salvo
     */
    getSavedValue(): T {
      return this.value;
    }
  }
  