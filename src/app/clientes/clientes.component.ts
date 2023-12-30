import {Component} from '@angular/core';
import {ClientsService} from '../services/clients.service';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import {FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup, AbstractControl} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import 'moment/locale/es';

import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

const moment = _rollupMoment || _moment;
moment.locale('es');



export const MY_FORMATS_WITH_DAY = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS, ],
    },
    { provide: MAT_DATE_FORMATS,
      useValue: MY_FORMATS_WITH_DAY },
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ],
})
export class ClientesComponent {
  meses = [
    { nombre: 'Enero', valor: 'ENERO' },
    { nombre: 'Febrero', valor: 'FEBRERO' },
    { nombre: 'Marzo', valor: 'MARZO' },
    { nombre: 'Abril', valor: 'ABRIL' },
    { nombre: 'Mayo', valor: 'MAYO' },
    { nombre: 'Junio', valor: 'JUNIO' },
    { nombre: 'Julio', valor: 'JULIO' },
    { nombre: 'Agosto', valor: 'AGOSTO' },
    { nombre: 'Septiembre', valor: 'SEPTIEMBRE' },
    { nombre: 'Octubre', valor: 'OCTUBRE' },
    { nombre: 'Noviembre', valor: 'NOVIEMBRE' },
    { nombre: 'Diciembre', valor: 'DICIEMBRE' }
  ];
  formulario!: FormGroup;
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();
  date = new FormControl(moment());
  dateWithDay = new FormControl(moment());
  dateForInstallation = new FormControl(moment());

  constructor(private _formBuilder: FormBuilder, private clientService: ClientsService) {
    this.formulario = this._formBuilder.group({
      mes_venta: [null],
      empresa: [null],
      fuv: [null],
      mes_venta2: [null],
      ejecutivo: [null],
      fac_bol: [null],
      ruc_dni: [null],
      r_social: [null],
      cliente: [null],
      email: [null, [Validators.email]],
      telefono: [null],
      direccion: [null],
      department: [null],
      equipo: [null],
      dongle: [null],
      tipo_venta: [null],
      precio_venta: [null, [Validators.required, this.formatoMonedaValidator]],
      separacion: [null, [this.formatoMonedaValidator]],
      cuota_inicial: [null, [this.formatoMonedaValidator]],
      fecha_ci: [null],
      eq_part_pago: [null],
      monto_finan: [null, [this.formatoMonedaValidator]],
      fecha_insta: [null],
      tipo_moneda: ['', Validators.required], // Nuevo control para la selección de moneda
    });
  }

  async registrarEnFirestore() {
    console.log('Valores del formulario:', this.formulario.value);

    // Convertir el objeto Moment a una fecha de JavaScript para fecha_ci
    const fecha_ci = this.formulario.value.fecha_ci ? this.formulario.value.fecha_ci.toDate() : null;

    // Convertir el objeto Moment a una fecha de JavaScript para fecha_insta
    const fecha_insta = this.formulario.value.fecha_insta ? this.formulario.value.fecha_insta.toDate() : null;

    // Actualizar los valores en el formulario
    this.formulario.patchValue({ fecha_ci, fecha_insta });

    try {
      const response = await this.clientService.addClient(this.formulario.value);
      console.log('Respuesta de Firestore:', response);
    } catch (error) {
      console.error('Error al registrar en Firestore:', error);
    }
  }



  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = (this.date.value || moment()).clone();
    ctrlValue.date(normalizedMonthAndYear.date());
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
  }

  formatoMonedaValidator(control: AbstractControl): { [key: string]: any } | null {
    const valor = control.value;
    if (valor && isNaN(valor)) {
      return { 'formatoMoneda': true }; // Error si no es un número
    }
    return null; // Válido
  }

}
