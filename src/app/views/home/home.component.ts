import { Component, OnInit } from '@angular/core';
import { IEmployees } from 'src/app/interfaces/employees';
import { EmployeesService } from 'src/app/services/employees/employees.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  employees: IEmployees[];

  constructor(
    private employeesService: EmployeesService
  ) { }

  ngOnInit(): void {
    this.employeesService.collection$().subscribe(employees => {
      this.employees = employees;
    })
  }

}
