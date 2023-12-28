import { Component, ChangeDetectorRef, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Sort, MatSort } from '@angular/material/sort';

import { CLIENTES, Cliente } from '../dashboard/dash-data';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  disableSelect = false;
  departamentoFiltrado: string = '';
  departamentos: string[] = this.obtenerDepartamentos();
  clientes: Cliente[] = CLIENTES;
  panelOpenState = false;
  filtro: string = '';
  sortedData: Cliente[];
  originalData: Cliente[];
  i!: number;
  displayedColumns: string[] = ['id', 'mes_venta', 'fuv', 'mes_venta2', 'ejecutivo', 'fac_bol', 'ruc_dni', 'r_social', 'cliente',
  'email', 'telefono', 'direccion', 'department', 'equipo', 'dongle',
  'tipo_venta', 'precio_venta', 'separacion', 'cuota_inicial', 'fecha_ci', 'eq_part_pago', 'monto_finan', 'fecha_insta', 'acciones'];
  dataSource = new MatTableDataSource<Cliente>(CLIENTES);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private cdr: ChangeDetectorRef) {
    this.sortedData = this.clientes.slice();
    this.originalData = this.clientes.slice();
    this.dataSource = new MatTableDataSource<Cliente>(this.originalData);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  aplicarFiltro(depto: string) {
    this.departamentoFiltrado = depto;
    this.filtrarClientesPorDepartamento();
  }

  toggleSelect() {
    if (this.disableSelect) {
      this.dataSource.data = this.originalData.slice();
    } else {
      // Restaurar la data original solo si el filtro de departamento está activo
      if (this.departamentoFiltrado) {
        this.dataSource.data = this.originalData.filter(cliente => cliente.department === this.departamentoFiltrado);
      } else {
        this.dataSource.data = this.originalData.slice();
      }
    }

    // Si hay un valor en this.filtro, aplicar el filtro de búsqueda
    if (this.filtro) {
      this.aplicarFiltroSearch();
    } else {
      // Si no hay valor en this.filtro, aplicar el filtro de departamento si está activo
      if (this.departamentoFiltrado && !this.disableSelect) {
        this.dataSource.data = this.dataSource.data.filter(cliente => cliente.department === this.departamentoFiltrado);
      }
    }
  }

  limpiarFiltroDepartamentos() {
    // Limpiar el filtro de departamentos y restaurar la data original
    this.departamentoFiltrado = '';

  // Restaurar la data original solo si el filtro de departamento no está deshabilitado
  if (!this.disableSelect) {
    this.dataSource.data = this.originalData.slice();
  }

    // Si hay un valor en this.filtro, aplicar el filtro de búsqueda
    if (this.filtro) {
      this.aplicarFiltroSearch();
    } else {
      // Si no hay valor en this.filtro, actualizar la tabla con la data original
      this.dataSource.data = this.originalData.slice();
      this.cdr.detectChanges(); // Asegúrate de detectar los cambios después de actualizar la data
    }
  }




  // Obtener una lista única de departamentos
  private obtenerDepartamentos(): string[] {
    return [...new Set(CLIENTES.map(cliente => cliente.department))];
  }

  // Filtrar la lista de clientes según el departamento seleccionado
  private filtrarClientesPorDepartamento() {
    if (this.disableSelect) {
      this.dataSource.data = this.originalData.slice();
    } else if (this.departamentoFiltrado) {
      this.dataSource.data = this.originalData.filter(cliente => cliente.department === this.departamentoFiltrado);
    } else {
      this.dataSource.data = this.originalData.slice();
    }
    //console.log("Datos después de filtrar por departamento:", this.dataSource.data);
    this.cdr.detectChanges();
  }


  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.id, b.id, isAsc);
        default:
          return 0;
      }
    });
  }

  aplicarFiltroSearch() {
    const filtroLowerCase = this.filtro.toLowerCase();

    this.dataSource.data = this.originalData.filter(sortedData =>
      sortedData.mes_venta.toLowerCase().includes(filtroLowerCase) ||
      sortedData.empresa.toLowerCase().includes(filtroLowerCase) ||
      sortedData.ejecutivo.toLowerCase().includes(filtroLowerCase) ||
      sortedData.fac_bol.toLowerCase().includes(filtroLowerCase) ||
      sortedData.ruc_dni.toLowerCase().includes(filtroLowerCase) ||
      sortedData.r_social.toLowerCase().includes(filtroLowerCase) ||
      sortedData.cliente.toLowerCase().includes(filtroLowerCase) ||
      sortedData.email.toLowerCase().includes(filtroLowerCase) ||
      sortedData.telefono.toLowerCase().includes(filtroLowerCase) ||
      sortedData.direccion.toLowerCase().includes(filtroLowerCase) ||
      sortedData.department.toLowerCase().includes(filtroLowerCase)
    );

    // Aplicar el filtro de departamento si no está deshabilitado
    if (!this.disableSelect && this.departamentoFiltrado) {
      this.dataSource.data = this.dataSource.data.filter(cliente => cliente.department === this.departamentoFiltrado);
    }
  }


  eliminarUsuario(id: number) {
    // Encuentra el índice del cliente con el id proporcionado
    const index = this.dataSource.data.findIndex(cliente => cliente.id === id);

    // Asegúrate de que el cliente exista antes de intentar eliminarlo
    if (index !== -1) {
      // Elimina el cliente del array de datos
      this.dataSource.data.splice(index, 1);

      // Actualiza la tabla después de realizar cambios
      this.dataSource._updateChangeSubscription();
    }
  }



}


function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
