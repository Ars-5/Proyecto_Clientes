import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentData, DocumentReference } from '@angular/fire/compat/firestore';
import Client from 'src/interfaces/clients.interface';
import 'rxjs/operators';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private clientsCollection: AngularFirestoreCollection<Client>;

  constructor(private afs: AngularFirestore) {
    this.clientsCollection = afs.collection<Client>('clients');
  }

  addClient(client: Client): Promise<DocumentReference<Client>> {
    return this.clientsCollection.add(client);
  }

  getClients() {
    return this.clientsCollection.valueChanges();
  }

  deleteClient(client: Client): Promise<void> {
    const clientId = client.id;
    if (!clientId) {
      console.error('El cliente no tiene un ID.');
      return Promise.reject('El cliente no tiene un ID.');
    }

    const clientDocRef = this.afs.doc(`clients/${clientId}`);
    return clientDocRef.delete();
  }

  deleteClientv2(client: Client) {
    return this.afs.collection("clients")
    .doc(client.id)
    .delete();
  }


  updateClient(client: Client, id: string): Promise<void> {
    const clientDocRef = this.clientsCollection.doc(id).ref;
    // Crear un objeto con las propiedades que se van a actualizar
    const updatedClient: Partial<Client> = {
      mes_venta: client.mes_venta,
      empresa: client.empresa,
      fuv: client.fuv,
      mes_venta2: client.mes_venta2,
      ejecutivo: client.ejecutivo,
      fac_bol:  client.fac_bol,
      ruc_dni:  client.ruc_dni,
      r_social:  client.r_social,
      cliente:  client.cliente,
      email:  client.email,
      telefono:  client.telefono,
      direccion: client.direccion,
      department: client.department,
      equipo: client.equipo,
      dongle: client.dongle,
      tipo_venta: client.tipo_venta,
      precio_venta: client.precio_venta,
      separacion: client.separacion,
      cuota_inicial: client.cuota_inicial,
      fecha_ci: client.fecha_ci,
      eq_part_pago: client.eq_part_pago,
      monto_finan: client.monto_finan,
      fecha_insta: client.fecha_insta,
    };
    // Actualizar el documento en Firestore
    return clientDocRef.update(updatedClient);
  }



}
