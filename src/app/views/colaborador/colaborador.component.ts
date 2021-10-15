import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Chart from 'chart.js/auto';
import { forkJoin, Observable, of } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { IEmployees } from 'src/app/interfaces/employees';
import { FireService } from 'src/app/services/base/fire.service';
import { SignalEnum } from 'src/app/_enums/SignalEnum';
import { ColaboradorViewModel } from 'src/app/_models/ColaboradorViewModel';


@Component({
  selector: 'colaborador',
  templateUrl: './colaborador.component.html',
  styleUrls: ['./colaborador.component.scss']
})
export class ColaboradorComponent implements OnInit, AfterViewInit {
  @ViewChild('radarCanvas') private radarCanvas: ElementRef;
  signalEnum = SignalEnum;
  colaborador: ColaboradorViewModel = new ColaboradorViewModel();
  detailsExpanded: boolean = false;
  salaryAdjustmentExpanded: boolean = false;
  employeeData: Partial<IEmployees>;
  teamData: Partial<IEmployees>;

  open: boolean = false;
  dismissible: boolean = true;
  timeout: number = 10000;

  salaryForm = this.formBuilder.group({
    currentSalary: [""],
    adjustmentType: [""],
    adjustmentValue: [""],
    newSalary: [""]
  })

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private fireService: FireService
  ) { }

  ngOnInit() {
    this.getRouteParams();
  }

  ngAfterViewInit() {

    const observables = [
      this.getPersonalData(this.colaborador.id),
      this.getTeamData(this.colaborador.team * 1)
    ]

    forkJoin(observables).subscribe(([personal, team]) => {
      console.log(this.employeeData);
      this.radarChartMethod(personal, team);
    });
  }

  radarChartMethod(personal: number[], team: number[]) {
    const labels = ['Educação', 'Satisfação na empresa', 'Interesse', 'Satisfação no emprego', 'Performance', 'Relacionamento', 'Equilíbrio'];
    const data = {
      labels: labels,
      datasets: [{
        label: this.colaborador.nome,
        data: personal,
        borderColor: "rgba(0, 0, 255, 0.5)",
        backgroundColor: "rgba(0, 0, 255, 0.5)",
      },
      {
        label: "Time",
        data: team,
        borderColor: "rgba(255, 0, 0, 0.3)",
        backgroundColor: "rgba(255, 0, 0, 0.3)",
      }]
    };

    this.radarCanvas = new Chart(this.radarCanvas.nativeElement,
      {
        type: 'radar',
        options: {
          maintainAspectRatio: false,
          scale: {
            min: 0,
            max: 5,
          }
        },
        data: data,
      })
  }

  getRouteParams(): void {
    this.activatedRoute.queryParams.pipe(
      map(params => this.colaborador = params as ColaboradorViewModel)
    )
      .subscribe(colaborador => {
        const salary = (colaborador.salario * 1).toFixed(2);
        this.salaryForm.patchValue({
          currentSalary: salary,
          adjustmentType: "absoluto"
        })
      });
  }

  getPersonalData(id: string): Observable<number[]> {
    return this.fireService.Firestore.collection("employees").doc(id).get().pipe(
      map(employeeDataDoc => employeeDataDoc.data() as IEmployees),
      tap(employee => this.employeeData = employee),
      mergeMap(employee => of([
        employee.education,
        employee.environmentSatisfaction,
        employee.jobInvolvement,
        employee.jobSatisfaction,
        employee.performanceRating,
        employee.relationshipSatisfaction,
        employee.workLifeBalance
      ]))
    )
  }


  getTeamData(team: number) {
    return this.fireService.Firestore.collection("employees").where("team", "==", team).get().pipe(
      map(teamSnap => teamSnap.docs.map(t => t.data() as IEmployees)),
      tap(t => this.getAllTeamData(t)),
      mergeMap(team => of([
        team.reduce((acc, curr) => acc + curr.education, 0) / team.length,
        team.reduce((acc, curr) => acc + curr.environmentSatisfaction, 0) / team.length,
        team.reduce((acc, curr) => acc + curr.jobInvolvement, 0) / team.length,
        team.reduce((acc, curr) => acc + curr.jobSatisfaction, 0) / team.length,
        team.reduce((acc, curr) => acc + curr.performanceRating, 0) / team.length,
        team.reduce((acc, curr) => acc + curr.relationshipSatisfaction, 0) / team.length,
        team.reduce((acc, curr) => acc + curr.workLifeBalance, 0) / team.length,
      ]))
    )
  }

  getAllTeamData(team: IEmployees[]): void {
    this.teamData = {
      age: team.reduce((acc, curr) => acc + curr.age, 0) / team.length,
      businessTravel: this.mode(team.map(t => t.businessTravel)),
      department: this.mode(team.map(t => t.department)),
      distanceFromHome: team.reduce((acc, curr) => acc + curr.distanceFromHome, 0) / team.length,
      education: team.reduce((acc, curr) => acc + curr.education, 0) / team.length,
      educationField: this.mode(team.map(t => t.educationField)),
      environmentSatisfaction: team.reduce((acc, curr) => acc + curr.environmentSatisfaction, 0) / team.length,
      gender: this.mode(team.map(t => t.gender)),
      jobInvolvement: team.reduce((acc, curr) => acc + curr.jobInvolvement, 0) / team.length,
      jobLevel: team.reduce((acc, curr) => acc + curr.jobLevel, 0) / team.length,
      jobRole: this.mode(team.map(t => t.jobRole)),
      jobSatisfaction: team.reduce((acc, curr) => acc + curr.jobSatisfaction, 0) / team.length,
      maritalStatus: this.mode(team.map(t => t.maritalStatus)),
      monthlyIncome: team.reduce((acc, curr) => acc + curr.monthlyIncome, 0) / team.length,
      monthlyRate: team.reduce((acc, curr) => acc + curr.monthlyRate, 0) / team.length,
      numCompaniesWorked: team.reduce((acc, curr) => acc + curr.numCompaniesWorked, 0) / team.length,
      overTime: this.mode(team.map(t => t.overTime)),
      percentSalaryHike: team.reduce((acc, curr) => acc + curr.percentSalaryHike, 0) / team.length,
      performanceRating: team.reduce((acc, curr) => acc + curr.performanceRating, 0) / team.length,
      relationshipSatisfaction: team.reduce((acc, curr) => acc + curr.relationshipSatisfaction, 0) / team.length,
      stockOptionLevel: team.reduce((acc, curr) => acc + curr.stockOptionLevel, 0) / team.length,
      team: team.reduce((acc, curr) => acc + curr.team, 0) / team.length,
      totalWorkingYears: team.reduce((acc, curr) => acc + curr.totalWorkingYears, 0) / team.length,
      trainingTimesLastYear: team.reduce((acc, curr) => acc + curr.trainingTimesLastYear, 0) / team.length,
      workLifeBalance: team.reduce((acc, curr) => acc + curr.workLifeBalance, 0) / team.length,
      yearsAtCompany: team.reduce((acc, curr) => acc + curr.yearsAtCompany, 0) / team.length,
      yearsInCurrentRole: team.reduce((acc, curr) => acc + curr.yearsInCurrentRole, 0) / team.length,
      yearsSinceLastPromotion: team.reduce((acc, curr) => acc + curr.yearsSinceLastPromotion, 0) / team.length,
      yearsWithCurrManager: team.reduce((acc, curr) => acc + curr.yearsWithCurrManager, 0) / team.length
    }

    console.log(this.teamData);
  }

  mode(arr: string[]) {
    return arr.sort((a, b) =>
      arr.filter(v => v === a).length
      - arr.filter(v => v === b).length
    ).pop();
  }

  toggleDetails(): void {
    this.detailsExpanded = !this.detailsExpanded;
  }

  toggleSalaryAdjustment(): void {
    this.salaryAdjustmentExpanded = !this.salaryAdjustmentExpanded;
  }

  calculeNewSalary(value?: number): void {
    const type = this.salaryForm.controls["adjustmentType"].value;
    const currentSalary = this.salaryForm.controls["currentSalary"].value * 1;
    const adjustValue = this.salaryForm.controls["adjustmentValue"].value ?
      this.salaryForm.controls["adjustmentValue"].value * 1 : value * 1;
    let newSalary: number;

    if (type === "absoluto")
      newSalary = currentSalary + adjustValue;
    else if (type === "percentual")
      newSalary = currentSalary + (currentSalary * adjustValue / 100);

    this.salaryForm.patchValue({
      newSalary: newSalary.toFixed(2)
    })
  }

  saveNewSalary(): void {
    const newSalary = Math.round(((this.salaryForm.controls["newSalary"].value * 1) + Number.EPSILON) * 100) / 100;

    this.fireService.Firestore.collection("employees").doc(this.colaborador.id).update({
      monthlyRate: newSalary
    }).subscribe();

    this.salaryForm.patchValue({
      currentSalary: newSalary.toFixed(2),
      adjustmentType: "absoluto",
      adjustmentValue: "",
      newSalary: ""
    });

    this.toggleSalaryAdjustment();
    this.open = true;
  }
}
