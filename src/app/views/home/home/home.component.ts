import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { IEmployees } from 'src/app/interfaces/employees';
import { IManagers } from 'src/app/interfaces/managers';
import { AuthService } from 'src/app/services/auth.service';
import { FireDocumentSnapshot, FireQuerySnapshot, FireService } from 'src/app/services/base/fire.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  manager: IManagers;
  employees: IEmployees[];
  salaryAverage: { jobRole: string, SalaryAverage: number }[] = [];
  employeesCount: { jobRole: string, Count: number }[] = [];
  yearsVersusSalary: { x: number, y: number }[] = [];
  jobLevelVersusQuantity: { jobLevel: string, Count: number }[] = [];

  constructor(private fireService: FireService,
    private authService: AuthService) { }

  ngOnInit() {
    const uid = this.authService.getCurrentUser.uid;

    this.getManagerData(uid).pipe(
      map(manager => {
        this.manager = manager.data() as IManagers;
        return this.manager.Department;
      }),
      mergeMap(department => this.getEmployeesByManagerDepartment(department))
    ).subscribe(employees => {
      this.employees = employees.docs.map(employee => employee.data());
    
      this.calculateSalaryAverage();
      this.calculateEmployeesCountByjobRole();
      this.calculateYearsVersusSalary();
      this.calculatejobLevelVersusEmployeesQuantity();
    });
  }

  getManagerData(uid: string): Observable<FireDocumentSnapshot<IManagers>> {
    return this.fireService.Firestore.collection<IManagers>('Manager').doc(uid).get();
  }

  getEmployeesByManagerDepartment(department: string): Observable<FireQuerySnapshot<IEmployees>> {
    return this.fireService.Firestore.collection<IEmployees>('employees')
      .where('department', '==', department).get();
  }

  calculateSalaryAverage(): void {
    const distinctedjobRoles = [...new Set(this.employees.map(item => item.jobRole))];

    distinctedjobRoles.forEach(job => {
      const employeesByDepartment = this.employees.filter(employees => employees.jobRole === job);
      this.salaryAverage.push({
        jobRole: job,
        SalaryAverage: employeesByDepartment.reduce((acc, curr) => acc + curr.monthlyRate, 0) / employeesByDepartment.length
      });
    });
  }

  calculateEmployeesCountByjobRole(): void {
    const distinctedjobRoles = [...new Set(this.employees.map(item => item.jobRole))];

    distinctedjobRoles.forEach(job => {
      this.employeesCount.push({
        jobRole: job,
        Count: this.employees.filter(employee => employee.jobRole === job).length
      })
    })
  }

  calculateYearsVersusSalary(): void {
    this.yearsVersusSalary = this.employees.map(employee => {
      return {
        x: employee.yearsAtCompany,
        y: employee.monthlyRate
      }
    })
  }

  calculatejobLevelVersusEmployeesQuantity(): void {
    const distinctedjobLevels = [1, 2, 3, 4, 5];

    distinctedjobLevels.forEach(level => {
      this.jobLevelVersusQuantity.push({
        jobLevel: "Nível: " + level,
        Count: this.employees.filter(employee => employee.jobLevel === level).length
      })
    });
  }
}

