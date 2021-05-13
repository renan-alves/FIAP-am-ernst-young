import { Inject, Injectable } from '@angular/core';
import { IEmployees } from 'src/app/interfaces/employees';
import { BaseService } from '../base/base.service';
import { FireService } from '../base/fire.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService extends BaseService<IEmployees>{
  protected basePath: string = 'employees';

  constructor(
    @Inject(FireService) protected fireService: FireService) {
    super(fireService);
  }
}
