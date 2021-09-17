import { Inject, Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { FireService } from '../base/fire.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerService extends BaseService<any>{
  protected basePath: string = 'Manager';

  constructor(
    @Inject(FireService) protected fireService: FireService) {
    super(fireService);
  }
}
