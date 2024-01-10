import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentSnapshot, AngularFirestoreCollection, DocumentData, DocumentReference, AngularFirestoreDocument, QuerySnapshot } from '@angular/fire/compat/firestore';
import Client from 'src/interfaces/clients.interface';
import 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { getFirestore, collection, getDoc, query, getDocs } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private clientsCollection: AngularFirestoreCollection<Client>;

  constructor(private afs: AngularFirestore) {
    this.clientsCollection = afs.collection<Client>('clients');
  }

  generateUniqueId(): string {
    return this.afs.createId();
  }

  // Agregar un documento con un ID personalizado
  addClientWithCustomId(customId: string, data: any): Promise<void> {
    const clientDocRef = this.afs.collection('clients').doc(customId);
    return clientDocRef.set(data);
  }


  addClient(client: Client): Promise<DocumentReference<Client>> {
    return this.clientsCollection.add(client);
  }

  getClients() {
    return this.clientsCollection.valueChanges();
  }


  getClientById(clienteId: string): Promise<any> {
    const clientDocRef: AngularFirestoreDocument<any> = this.afs.collection('clients').doc(clienteId);

    return clientDocRef.get().toPromise().then((docSnapshot) => {
      if (docSnapshot && docSnapshot.exists) {
        const data = docSnapshot.data()?.data; // Acceder a la propiedad 'data'
        const id = docSnapshot.id;

        console.log('Datos del cliente en el servicio:', data);
        console.log('ID del cliente en el servicio:', id);

        return { id, ...data };
      } else {
        console.log('Cliente no encontrado en el servicio');
        return null;
      }
    });
  }

  async getAllClientIds(): Promise<string[]> {
    try {
      const snapshot = await this.afs.collection('clients').get().toPromise();

      if (snapshot) {
        return snapshot.docs.map(doc => doc.id);
      } else {
        console.error('Error: No se pudo obtener el snapshot.');
        return [];
      }
    } catch (error) {
      console.error('Error al obtener los Document IDs:', error);
      return [];
    }
  }


// pendiente correciones, por falta de tiempo
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



  // getCliente(id: string): Observable<any> {
  //   return this.afs.collection('clientes').doc(id).valueChanges();
  // }

  updateCliente(id: string, data: any): Promise<void> {
    return this.afs.collection('clientes').doc(id).update(data);
  }


}
