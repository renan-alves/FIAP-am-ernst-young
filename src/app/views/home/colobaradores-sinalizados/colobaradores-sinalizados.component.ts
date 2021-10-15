import { Component, OnInit } from '@angular/core';
import { IEmployees } from 'src/app/interfaces/employees';
import { FireService } from 'src/app/services/base/fire.service';
import { SignalEnum } from 'src/app/_enums/SignalEnum';
import { ColaboradorMinimalViewModel } from 'src/app/_models/ColaboradorMinimalViewModel';
import { ColaboradorViewModel } from 'src/app/_models/ColaboradorViewModel';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'colobaradores-sinalizados',
  templateUrl: './colobaradores-sinalizados.component.html',
  styleUrls: ['./colobaradores-sinalizados.component.scss']
})
export class ColobaradoresSinalizadosComponent implements OnInit {
  faExclamationCircle = faExclamationCircle;

  colaboradores: ColaboradorMinimalViewModel[];

  signalEnum = SignalEnum;
  constructor(
    private fireService: FireService
  ) { }

  ngOnInit() {
    this.fireService.Firestore.collection("employees")
      .where("attrition", "==", "No")
      .orderBy("alertLevel", "desc")
      .limit(5)
      .get().subscribe(employeeSnap => {
        const data = employeeSnap.docs.map(e => Object.assign(e.data(), { id: e.ref.id } as IEmployees & { id: string }));
        this.colaboradores = data.map(d => {
          return {
            id: d.id,
            nome: d.name,
            cargo: d.jobRole,
            signal: d.alertLevel,
            imagem: 'assets/images/avatar-padrao.png'
          }
        })
      })
  }

  getColor(element: ColaboradorViewModel) {
    const hue = (120 - (120 / .52 * (element.signal))).toString(10);
    return ["hsl(", hue, ",100%,50%)"].join("");
  }
}
