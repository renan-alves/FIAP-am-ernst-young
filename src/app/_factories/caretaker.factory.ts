import { Injectable, Injector } from '@angular/core';
import { OriginatorService } from '../services/originator.service';
import { Caretaker } from '../_commom/caretaker';
import { isNullOrUndefined } from '../_commom/util';

@Injectable({
  providedIn: 'root',
})
export class CaretakerFactory {
  constructor(private injector: Injector) {}

  create<T>(numberOfPreviousStates?: number): Caretaker<T> {
    const originator = this.injector.get<OriginatorService<T>>(OriginatorService);
    const caretaker = new Caretaker<T>(originator);

    if (!isNullOrUndefined(numberOfPreviousStates)) {
      caretaker.numberOfPreviousStates = numberOfPreviousStates;
    }

    return caretaker;
  }

  createGroup<T>(group: { [key: string]: number }): T {
    const caretakers = {} as T;

    Object.keys(group).forEach((key) => {
      caretakers[key] = this.create(group[key]);
    });

    return caretakers;
  }
}
