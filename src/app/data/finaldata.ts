

export class Clientevf {
  id: number;
  mes_venta: string;
  empresa: string;
  fuv: string;
  mes_venta2: string;
  ejecutivo: string;
  fac_bol:  string;
  ruc_dni:  string;
  r_social:  string;
  cliente:  string;
  email:  string;
  telefono:  string;
  direccion: string;
  department: string;
  equipo: string;
  dongle: string;
  tipo_venta: string;
  precio_venta: string;
  separacion: string;
  cuota_inicial: string;
  fecha_ci: string;
  eq_part_pago: string;
  monto_finan: string;
  fecha_insta: string;

  constructor(
    id: number,
    mes_venta: string,
    empresa: string,
    fuv: string,
    mes_venta2: string,
    ejecutivo: string,
    fac_bol:  string,
    ruc_dni:  string,
    r_social:  string,
    cliente:  string,
    email:  string,
    telefono:  string,
    direccion: string,
    department: string,
    equipo: string,
    dongle: string,
    tipo_venta: string,
    precio_venta: string,
    separacion: string,
    cuota_inicial: string,
    fecha_ci: string,
    eq_part_pago: string,
    monto_finan: string,
    fecha_insta: string)
    {
      this.id = id;
      this.mes_venta = mes_venta;
      this.empresa = empresa;
      this.fuv = fuv,
      this.mes_venta2 = mes_venta2,
      this.ejecutivo = ejecutivo,
      this.fac_bol =  fac_bol,
      this.ruc_dni =  ruc_dni,
      this.r_social =  r_social,
      this.cliente =  cliente,
      this.email =  email,
      this.telefono =  telefono,
      this.direccion = direccion,
      this.department = department,
      this.equipo = equipo,
      this.dongle = dongle,
      this.tipo_venta = tipo_venta,
      this.precio_venta = precio_venta,
      this.separacion = separacion,
      this.cuota_inicial = cuota_inicial,
      this.fecha_ci = fecha_ci,
      this.eq_part_pago = eq_part_pago,
      this.monto_finan = monto_finan,
      this.fecha_insta = fecha_insta;
  }
}

export const CLIENTES: Clientevf[] = [
    new Clientevf(1, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""),
    ]

