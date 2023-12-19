

export class Cliente {
  id: number;
  empresa: string;
  mes_venta: string;
  ejecutivo: string;
  fac_bol: string;
  ruc_dni: string;
  r_social: string;
  cliente: string;
  email: string;
  telefono: string;
  direccion: string;
  department: string;

  constructor(id: number, empresa: string, mes_venta: string, ejecutivo: string, fac_bol: string, ruc_dni: string,
    r_social: string, cliente: string, email: string, telefono: string, direccion: string, department: string) {
      this.id = id;
      this.empresa = empresa;
      this.mes_venta = mes_venta;
      this.ejecutivo = ejecutivo;
      this.fac_bol = fac_bol;
      this.ruc_dni = ruc_dni;
      this.r_social = r_social;
      this.cliente = cliente;
      this.email = email;
      this.telefono = telefono;
      this.direccion = direccion;
      this.department = department;
  }
}

export const CLIENTES: Cliente[] = [
  new Cliente(1, 'BIOIMAGEN S.A.C.', 'Enero', 'Ejecutivo1', 'BOLETA', '12345678901', 'RazonSocial1', 'Cliente1 Apellido1', 'cliente1@gmail.com', '912345678', 'Avenida1', 'Lima'),
  new Cliente(2, 'BIOIMAGEN S.A.C.', 'Enero', 'Ejecutivo1', 'BOLETA', '12345678901', 'RazonSocial1', 'Cliente1 Apellido1', 'cliente1@gmail.com', '912345678', 'Avenida1', 'Cusco'),
  new Cliente(3, 'BIOIMAGEN S.A.C.', 'Febrero', 'Ejecutivo1', 'BOLETA', '12345678901', 'RazonSocial1', 'Cliente1 Apellido1', 'cliente1@gmail.com', '912345678', 'Avenida1', 'Cusco'),
  new Cliente(4, 'BIOIMAGEN S.A.C.', 'Febrero', 'Ejecutivo1', 'BOLETA', '12345678901', 'RazonSocial1', 'Cliente1 Apellido1', 'cliente1@gmail.com', '912345678', 'Avenida1', 'Lima'),
  new Cliente(5, 'BIOIMAGEN S.A.C.', 'Marzo', 'Ejecutivo1', 'BOLETA', '12345678901', 'RazonSocial1', 'Cliente1 Apellido1', 'cliente1@gmail.com', '912345678', 'Avenida1', 'Lima'),
  new Cliente(6, 'MEDICA INNOVADORA', 'Febrero', 'Ejecutivo2', 'FACTURA', '98765432109', 'RazonSocial2', 'Cliente2 Apellido2', 'cliente2@gmail.com', '923456789', 'Avenida2', 'Arequipa'),
  new Cliente(7, 'BIOIMAGEN S.A.C.', 'Marzo', 'Ejecutivo3', 'BOLETA', '34567890123', 'RazonSocial3', 'Cliente3 Apellido3', 'cliente3@gmail.com', '934567890', 'Avenida3', 'Cusco'),
  new Cliente(8, 'MEDICA INNOVADORA', 'Abril', 'Ejecutivo1', 'FACTURA', '67890123456', 'RazonSocial1', 'Cliente4 Apellido4', 'cliente4@gmail.com', '945678901', 'Avenida4', 'Lima'),
  new Cliente(9, 'BIOIMAGEN S.A.C.', 'Mayo', 'Ejecutivo2', 'BOLETA', '90123456789', 'RazonSocial2', 'Cliente5 Apellido5', 'cliente5@gmail.com', '956789012', 'Avenida5', 'Arequipa'),
  new Cliente(10, 'MEDICA INNOVADORA', 'Junio', 'Ejecutivo3', 'FACTURA', '23456789012', 'RazonSocial3', 'Cliente6 Apellido6', 'cliente6@gmail.com', '967890123', 'Avenida6', 'Cusco'),
  new Cliente(11, 'BIOIMAGEN S.A.C.', 'Julio', 'Ejecutivo1', 'BOLETA', '56789012345', 'RazonSocial1', 'Cliente7 Apellido7', 'cliente7@gmail.com', '978901234', 'Avenida7', 'Lima'),
  new Cliente(12, 'MEDICA INNOVADORA', 'Agosto', 'Ejecutivo2', 'FACTURA', '89012345678', 'RazonSocial2', 'Cliente8 Apellido8', 'cliente8@gmail.com', '989012345', 'Avenida8', 'Arequipa'),
  new Cliente(13, 'BIOIMAGEN S.A.C.', 'Septiembre', 'Ejecutivo3', 'BOLETA', '01234567890', 'RazonSocial3', 'Cliente9 Apellido9', 'cliente9@gmail.com', '990123456', 'Avenida9', 'Cusco'),
  new Cliente(14, 'MEDICA INNOVADORA', 'Octubre', 'Ejecutivo1', 'FACTURA', '12345678901', 'RazonSocial1', 'Cliente10 Apellido10', 'cliente10@gmail.com', '901234567', 'Avenida10', 'Lima'),
  new Cliente(15, 'BIOIMAGEN S.A.C.', 'Noviembre', 'Ejecutivo2', 'BOLETA', '23456789012', 'RazonSocial2', 'Cliente11 Apellido11', 'cliente11@gmail.com', '912345678', 'Avenida11', 'Arequipa'),
  new Cliente(16, 'MEDICA INNOVADORA', 'Diciembre', 'Ejecutivo3', 'FACTURA', '34567890123', 'RazonSocial3', 'Cliente12 Apellido12', 'cliente12@gmail.com', '923456789', 'Avenida12', 'Cusco'),
  new Cliente(17, 'MEDICA INNOVADORA', 'Diciembre', 'Ejecutivo3', 'FACTURA', '34567890123', 'RazonSocial3', 'Cliente12 Apellido12', 'cliente12@gmail.com', '923456789', 'Avenida12', 'Cusco'),
  new Cliente(18, 'BIOIMAGEN S.A.C.', 'Diciembre', 'Ejecutivo3', 'FACTURA', '34567890123', 'RazonSocial3', 'Cliente12 Apellido12', 'cliente12@gmail.com', '923456789', 'Avenida12', 'Cusco'),
  new Cliente(19, 'BIOIMAGEN S.A.C.', 'Diciembre', 'Ejecutivo3', 'FACTURA', '34567890123', 'RazonSocial3', 'Cliente12 Apellido12', 'cliente12@gmail.com', '923456789', 'Avenida12', 'Cusco'),
  new Cliente(20, 'BIOIMAGEN S.A.C.', 'Diciembre', 'Ejecutivo3', 'FACTURA', '34567890123', 'RazonSocial3', 'Cliente12 Apellido12', 'cliente12@gmail.com', '923456789', 'Avenida12', 'Cusco'),
  new Cliente(21, '', 'Diciembre', 'Ejecutivo3', 'FACTURA', '34567890123', 'RazonSocial3', 'Cliente12 Apellido12', 'cliente12@gmail.com', '923456789', 'Avenida12', 'Cusco'),
  new Cliente(22, 'MEDICA INNOVADORA', 'Diciembre', 'Ejecutivo3', 'FACTURA', '34567890123', 'RazonSocial3', 'Cliente12 Apellido12', 'cliente12@gmail.com', '923456789', 'Avenida12', 'Cusco'),
  new Cliente(23, 'MEDICA INNOVADORA', 'Diciembre', 'Ejecutivo3', 'FACTURA', '34567890123', 'RazonSocial3', 'Cliente12 Apellido12', 'cliente12@gmail.com', '923456789', 'Avenida12', 'Cusco'),

];
