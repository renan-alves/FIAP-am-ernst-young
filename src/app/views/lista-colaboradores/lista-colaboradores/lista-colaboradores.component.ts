import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { IEmployees } from 'src/app/interfaces/employees';
import { IManagers } from 'src/app/interfaces/managers';
import { AuthService } from 'src/app/services/auth.service';
import { FireDocumentSnapshot, FireQuerySnapshot, FireService } from 'src/app/services/base/fire.service';
import { SignalEnum } from 'src/app/_enums/SignalEnum';
import { ColaboradorViewModel } from 'src/app/_models/ColaboradorViewModel';
import { MinimalViewModel } from 'src/app/_models/Commom/MinimalViewModel';

@Component({
  selector: 'lista-colaboradores',
  templateUrl: './lista-colaboradores.component.html',
  styleUrls: ['./lista-colaboradores.component.scss']
})
export class ListaColaboradoresComponent implements OnInit {

  colaboradores: ColaboradorViewModel[];
  lstArea: MinimalViewModel[] = [];
  lstCargo: MinimalViewModel[] = [];

  formFilter = this.fb.group({
    nome: [''],
    cargos: [[]],
    areas: [[]],
  });

  hideTable = true;
  manager: any;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private fireService: FireService) { }


  ngOnInit() {

    const uid = this.authService.getCurrentUser.uid

    this.getManagerData(uid).pipe(
      map(manager => manager.data() as IManagers),
      mergeMap(manager => this.getEmployeesByDepartment(manager.Department)),
      map(employeesSnap => employeesSnap.docs.map(employee => Object.assign(employee.data(), { id: employee.ref.id }))),
      map(employees => this.loadGridDataSource(employees))
    ).subscribe(_ => this.hideTable = false);

    this.lstCargo = [
      { codigo: 'Human Resources' },
      { codigo: 'Sales' },
      { codigo: 'Research & Development' }
    ]

    this.lstArea = [
      { codigo: 'Sales Executive' },
      { codigo: 'Sales Representative' },
      { codigo: 'Healthcare Representative' },
      { codigo: 'Laboratory Technician' },
      { codigo: 'Research Scientist' },
      { codigo: 'Manufacturing Director' },
      { codigo: 'Human Resources' },
      { codigo: 'Manager' },
      { codigo: 'Research Director' }
    ]
  }

  getManagerData(uid: string): Observable<FireDocumentSnapshot<IManagers>> {
    return this.fireService.Firestore.collection<IManagers>('Manager').doc(uid).get();
  }

  getEmployeesByDepartment(department: string): Observable<FireQuerySnapshot<IEmployees>> {
    this.formFilter.setValue({ 'areas': [department], nome: '', cargos: [] });
    return this.fireService.Firestore.collection<IEmployees>('employees')
      .where('department', '==', department)
      .where('attrition', '==', 'No')
      .limit(10).get();
  }

  loadGridDataSource(employees: IEmployees[]) {
    this.colaboradores = employees?.map((employee, index) => {
      return {
        id: employee.id,
        nome: employee.name,
        cargo: employee.jobRole,
        area: employee.department,
        ultimoReajuste: new Date(),
        salario: employee.monthlyRate,
        signal: employee.alertLevel,
        imagem: 'assets/images/avatar-padrao.png',
        idade: employee.age,
        tempoDeEmpresa: employee.yearsAtCompany,
        team: employee.team,
        areaDeEstudo: employee.educationField
      } as ColaboradorViewModel;
    });
  }

  onFilter() {
    const nomeFilter: string = this.formFilter.get('nome').value;
    const cargoFilter: string[] = this.formFilter.get('cargos').value;
    const areaFilter: string[] = this.formFilter.get('areas').value;

    const observables = [];

    if (nomeFilter) observables.push(
      this.fireService.Firestore.collection<IEmployees>('employees')
        .where('name', '==', nomeFilter)
        .where('attrition', '==', 'No').limit(50).get()
    );

    if (cargoFilter.length > 0) observables.push(
      this.fireService.Firestore.collection<IEmployees>('employees')
        .where('jobRole', 'in', cargoFilter)
        .where('attrition', '==', 'No').limit(50).get()
    );

    if (areaFilter.length > 0) observables.push(
      this.fireService.Firestore.collection<IEmployees>('employees')
        .where('department', 'in', areaFilter)
        .where('attrition', '==', 'No').limit(50).get()
    );

    if (!nomeFilter && cargoFilter.length < 1 && areaFilter.length < 1) observables.push(
      this.fireService.Firestore.collection<IEmployees>('employees')
        .where('attrition', '==', 'No').get()
    );

    forkJoin(observables).subscribe((snap: FireQuerySnapshot<IEmployees>[]) => {

      const arrays = []
      snap.forEach(items => {
        arrays.push(items?.docs?.map(item => Object.assign(item.data(), { id: item.ref.id })));
      });

      const result: IEmployees[] = arrays.reduce((acc, curr) =>
        acc.filter((a: IEmployees) =>
          curr.some((b: IEmployees) => a.id === b.id)));

      this.loadGridDataSource(result);
    })
  }
}
