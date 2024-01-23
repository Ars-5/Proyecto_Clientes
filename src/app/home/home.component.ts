import { Component, ChangeDetectorRef, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Sort, MatSort } from '@angular/material/sort';
import { ClientsService } from '../services/clients.service';
import Client from 'src/interfaces/clients.interface';
import { Router } from '@angular/router';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

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
  displayedColumns: string[] = ['id', 'mes_venta', 'empresa',  'ejecutivo', 'ruc_dni', 'r_social', 'cliente',
  'email', 'telefono', 'direccion',  'department', 'equipo', 'dongle', 'fecha_insta', 'acciones'];
  dataSource = new MatTableDataSource<Client>();



  isSideNavCollapsed = false;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private cdr: ChangeDetectorRef, private clientService: ClientsService, private router: Router) {
    this.sortedData = [];
    this.originalData = [];
    this.dataSource = new MatTableDataSource<Client>(this.originalData);
  }

  formatFechaCi(cliente: any): string {
    return cliente.fecha_ci?.seconds
      ? new Date(cliente.fecha_ci.seconds * 1000).toLocaleDateString('es-ES')
      : 'N/A';
  }

  formatFechaInsta(cliente: any): string {
    return cliente.fecha_insta?.seconds
      ? new Date(cliente.fecha_insta.seconds * 1000).toLocaleDateString('es-ES')
      : 'N/A';
  }

  ngOnInit(): void {
    this.clientService.getClients()
      .subscribe((clientesvf: Client[]) => {
        if (clientesvf) {
          // Mapea los datos para incluir el ID en cada cliente
          this.originalData = clientesvf.map((cliente) => {
            const id = cliente.id; // asumiendo que 'id' es la propiedad correcta que contiene el ID
            const data = cliente as unknown as Client; // asumiendo que los datos están directamente en el objeto
            return {
              ...data
            };
          });

          // Actualiza la data del MatTableDataSource con la nueva data que incluye los IDs
          this.dataSource.data = this.originalData.slice();
          // Actualiza la lista de departamentos
          this.departamentos = this.obtenerDepartamentos();
        } else {
          console.error('Error: clientesvf es undefined');
        }
      },
      (error) => {
        console.error('Error getting clients: ', error);
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
      if (this.departamentoFiltrado) {
        this.dataSource.data = this.originalData.filter(cliente => cliente.department === this.departamentoFiltrado);
      } else {
        this.dataSource.data = this.originalData.slice();
      }
    }
    if (this.filtro) {
      this.aplicarFiltroSearch();
    } else {
      if (this.departamentoFiltrado && !this.disableSelect) {
        this.dataSource.data = this.dataSource.data.filter(cliente => cliente.department === this.departamentoFiltrado);
      }
    }
  }

  limpiarFiltroDepartamentos() {
    this.departamentoFiltrado = '';
  if (!this.disableSelect) {
    this.dataSource.data = this.originalData.slice();
  }
    if (this.filtro) {
      this.aplicarFiltroSearch();
    } else {
      this.dataSource.data = this.originalData.slice();
      this.cdr.detectChanges();
    }
  }

// Obtener una lista única de departamentos
private obtenerDepartamentos(): string[] {
  if (this.originalData) {
    return [...new Set(this.originalData.map(cliente => cliente.department))];
  } else {
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

  mostrarDetalles(clienteId: string) {
    this.clientService.getClientById(clienteId)
      .then((cliente) => {
        if (cliente !== null) {
          console.log('Detalles del cliente en el componente:', cliente);
          this.router.navigate(['/details', clienteId]);
        } else {
          console.log('Cliente no encontrado en el componente');
        }
      })
      .catch((error) => {
        console.error('Error al obtener detalles del cliente:', error);
      });
  }

  eliminarCliente(clienteId: string) {
    console.log('Cliente a eliminar:', clienteId);
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este cliente?');
    if (confirmacion) {
      this.clientService.deleteClientv2({ id: clienteId } as Client)
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
  }

  editarUsuario(clienteId: string) {
    this.router.navigate(['/edit-client', clienteId]);
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
