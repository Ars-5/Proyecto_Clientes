import { Component } from '@angular/core';
import { CLIENTES, Cliente } from '../dashboard/dash-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  departamentoFiltrado: string = '';
  departamentos: string[] = this.obtenerDepartamentos();
  clientes: Cliente[] = CLIENTES;

  aplicarFiltro(depto: string) {
    this.departamentoFiltrado = depto;
    // Filtrar la lista de clientes según el departamento seleccionado
    this.filtrarClientesPorDepartamento();
  }
  
// Obtener una lista única de departamentos
private obtenerDepartamentos(): string[] {
  return [...new Set(CLIENTES.map(cliente => cliente.department))];
}

  // Filtrar la lista de clientes según el departamento seleccionado
  private filtrarClientesPorDepartamento() {
    if (this.departamentoFiltrado) {
      this.clientes = CLIENTES.filter(cliente => cliente.department === this.departamentoFiltrado);
    } else {
      // Si no hay departamento seleccionado, mostrar todos los clientes
      this.clientes = CLIENTES;
    }
  }
}
