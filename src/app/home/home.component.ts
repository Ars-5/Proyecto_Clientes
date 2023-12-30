import { Component, ChangeDetectorRef, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Sort, MatSort } from '@angular/material/sort';
import { ClientsService } from '../services/clients.service';
import Client from 'src/interfaces/clients.interface';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnInit  {
  clientesvf!: Client[];
  disableSelect = false;
  departamentoFiltrado: string = '';
  departamentos: string[] = this.obtenerDepartamentos();
  panelOpenState = false;
  filtro: string = '';
  sortedData: Client[] = [];
  originalData: Client[] = [];
  i!: number;
  displayedColumns: string[] = ['id', 'mes_venta', 'fuv', 'mes_venta2', 'ejecutivo', 'fac_bol', 'ruc_dni', 'r_social', 'cliente',
  'email', 'telefono', 'direccion', 'department', 'equipo', 'dongle', 'tipo_venta', 'precio_venta', 'separacion', 'cuota_inicial', 'fecha_ci', 'eq_part_pago', 'monto_finan', 'fecha_insta', 'acciones'];
  dataSource = new MatTableDataSource<Client>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private cdr: ChangeDetectorRef, private clientService: ClientsService) {
    this.sortedData = [];
    this.originalData = [];
    this.dataSource = new MatTableDataSource<Client>(this.originalData);
  }



  ngOnInit(): void {
    this.clientService.getClients().subscribe(clientesvf => {
      // Mapea los datos para incluir el ID en cada cliente
      this.originalData = clientesvf.map(cliente => {
        const id = cliente.id; // asumiendo que 'id' es la propiedad correcta que contiene el ID
        const data = cliente as unknown as Client; // asumiendo que los datos están directamente en el objeto

        return {
          id: id,
          ...data
        };
      });

      // Actualiza la data del MatTableDataSource con la nueva data que incluye los IDs
      this.dataSource.data = this.originalData.slice();

      // Actualiza la lista de departamentos
      this.departamentos = this.obtenerDepartamentos();
    });
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
  if (this.originalData) {
    return [...new Set(this.originalData.map(cliente => cliente.department))];
  } else {
    // Puedes manejar el caso en que los datos aún no se hayan cargado
    return [];
  }
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

  aplicarFiltroSearch() {
    const filtroLowerCase = this.filtro.toLowerCase();
    this.dataSource.data = this.originalData.filter(sortedData =>
      (sortedData.mes_venta && sortedData.mes_venta.toLowerCase().includes(filtroLowerCase)) ||
      (sortedData.empresa && sortedData.empresa.toLowerCase().includes(filtroLowerCase)) ||
      (sortedData.ejecutivo && sortedData.ejecutivo.toLowerCase().includes(filtroLowerCase)) ||
      (sortedData.fac_bol && sortedData.fac_bol.toLowerCase().includes(filtroLowerCase)) ||
      (sortedData.ruc_dni && sortedData.ruc_dni.toLowerCase().includes(filtroLowerCase)) ||
      (sortedData.r_social && sortedData.r_social.toLowerCase().includes(filtroLowerCase)) ||
      (sortedData.cliente && sortedData.cliente.toLowerCase().includes(filtroLowerCase)) ||
      (sortedData.email && sortedData.email.toLowerCase().includes(filtroLowerCase)) ||
      (sortedData.telefono && sortedData.telefono.toLowerCase().includes(filtroLowerCase)) ||
      (sortedData.direccion && sortedData.direccion.toLowerCase().includes(filtroLowerCase)) ||
      (sortedData.department && sortedData.department.toLowerCase().includes(filtroLowerCase))
    );
    if (!this.disableSelect && this.departamentoFiltrado) {
      this.dataSource.data = this.dataSource.data.filter(cliente => cliente.department === this.departamentoFiltrado);
    }
  }




  eliminarCliente(cliente: Client) {
    console.log('Cliente a eliminar:', cliente);
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este cliente?');
    if (confirmacion) {
      this.clientService.deleteClientv2(cliente)
        .then(() => {
          console.log('Cliente eliminado con éxito.');
          this.clientService.getClients().subscribe(clientesvf => {
            this.originalData = clientesvf;
          });
        })
        .catch(error => {
          console.error('Error al eliminar cliente:', error);
        });
    }
    console.log(this.clientesvf)
  }




}


function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
