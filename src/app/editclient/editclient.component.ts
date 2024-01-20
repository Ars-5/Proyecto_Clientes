import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {ClientsService} from '../services/clients.service';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import {FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup, AbstractControl} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import Swal from 'sweetalert2';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';

import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { ActivatedRoute, Router } from '@angular/router';

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
  selector: 'app-editclient',
  templateUrl: './editclient.component.html',
  styleUrls: ['./editclient.component.scss'],
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
export class EditclientComponent {
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
  clienteId!: string;

  loading = false;


  constructor(private _formBuilder: FormBuilder, private clientService: ClientsService, private router: Router, private route: ActivatedRoute,) {
    this.formulario = this._formBuilder.group({
      mes_venta: [null],
      empresa: [null],
      ejecutivo: [null],
      ruc_dni: [null],
      r_social: [null],
      cliente: [null],
      email: [null, [Validators.email]],
      telefono: [null],
      direccion: [null],
      department: [null],
      equipo: [null],
      dongle: [null],
      fecha_ci: [null],
      fecha_insta: [''],
      tipo_moneda: ['', Validators.required], // Nuevo control para la selección de moneda
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.clienteId = params['id'];
      this.cargarDatosCliente();
    });
  }

  async cargarDatosCliente() {
    try {
      const cliente = await this.clientService.getClient(this.clienteId);

      if (cliente) {
        // Asignar al formulario
        this.formulario.patchValue(cliente);
      } else {
        console.error('Cliente no encontrado en el servicio');
      }
    } catch (error) {
      console.error('Error al cargar los datos del cliente:', error);
    }
  }

  async actualizarCliente() {
    this.loading = true;
    console.log('Cliente ID:', this.clienteId);
    const datosActualizados = this.formulario.value;
    this.loading = true;
    // Convierte las fechas de Moment a Date
    datosActualizados.fecha_ci = "null";
    datosActualizados.fecha_insta = datosActualizados.fecha_insta.toDate();
    this.loading = true;
    try {
      await this.clientService.updateClient(this.clienteId, datosActualizados);
      Swal.fire('Éxito', 'El cliente ha sido actualizado correctamente', 'success');
      this.router.navigate(['/home']);
      this.loading = false;
    } catch (error) {
      console.error('Error al actualizar el cliente:', error);
      Swal.fire('Error', 'Hubo un error al actualizar el cliente', 'error');
      this.loading = false;
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
