import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CLIENTES, Cliente } from './dash-data';
import {Sort, MatSortModule, MatSort} from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  mostrarFormulario = false;
  Clientes: Cliente[] = CLIENTES;
  filtro: string = '';
  sortedData: Cliente[];
  originalData: Cliente[];
  dataSource = new MatTableDataSource<Cliente>(CLIENTES);
  displayedColumns: string[] = ['id', 'mes_venta', 'empresa', 'ejecutivo', 'fac_bol', 'ruc_dni', 'r_social', 'cliente', 'email', 'telefono', 'direccion', 'department', 'acciones'];


  constructor() {
    this.sortedData = this.Clientes.slice();
    this.originalData = this.Clientes.slice();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; // Si estás utilizando matSort en tu HTML
  }

  aplicarFiltro() {
    this.sortedData = this.originalData.filter(sortedData =>
      sortedData.mes_venta.toLowerCase().includes(this.filtro.toLowerCase()) ||
      sortedData.empresa.toLowerCase().includes(this.filtro.toLowerCase()) ||
      sortedData.ejecutivo.toLowerCase().includes(this.filtro.toLowerCase()) ||
      sortedData.fac_bol.toLowerCase().includes(this.filtro.toLowerCase()) ||
      sortedData.ruc_dni.toLowerCase().includes(this.filtro.toLowerCase()) ||
      sortedData.r_social.toLowerCase().includes(this.filtro.toLowerCase()) ||
      sortedData.cliente.toLowerCase().includes(this.filtro.toLowerCase()) ||
      sortedData.email.toLowerCase().includes(this.filtro.toLowerCase()) ||
      sortedData.telefono.toLowerCase().includes(this.filtro.toLowerCase()) ||
      sortedData.direccion.toLowerCase().includes(this.filtro.toLowerCase()) ||
      sortedData.department.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  sortData(sort: Sort) {
    const data = this.Clientes.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.id, b.id, isAsc);
        case 'mes_venta':
          return compare(a.mes_venta, b.mes_venta, isAsc);
        case 'empresa':
          return compare(a.empresa, b.empresa, isAsc);
        case 'ejecutivo':
          return compare(a.ejecutivo, b.ejecutivo, isAsc);
        case 'fac_bol':
          return compare(a.fac_bol, b.fac_bol, isAsc);
        case 'ruc_dni':
          return compare(a.ruc_dni, b.ruc_dni, isAsc);
        case 'r_social':
          return compare(a.r_social, b.r_social, isAsc);
        case 'cliente':
          return compare(a.cliente, b.cliente, isAsc);
        case 'email':
          return compare(a.email, b.email, isAsc);
        case 'telefono':
          return compare(a.telefono, b.telefono, isAsc);
        case 'direccion':
          return compare(a.direccion, b.direccion, isAsc);
        case 'department':
          return compare(a.department, b.department, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
