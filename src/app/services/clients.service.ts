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


  getClients() {
    return this.clientsCollection.valueChanges();
  }


  getClientById(clienteId: string): Promise<any> {
    const clientDocRef: AngularFirestoreDocument<any> = this.afs.collection('clients').doc(clienteId);
    return clientDocRef.get().toPromise().then((docSnapshot) => {
      if (docSnapshot && docSnapshot.exists) {
        const data = docSnapshot.data()?.data; // Acceder a la propiedad 'data'
        const id = docSnapshot.id;
        console.log('ID del cliente en el servicio:', id);
        return { id, ...data };
      } else {
        console.log('Cliente no encontrado en el servicio');
        return null;
      }
    });
  }


  getClient(clientId: string): Promise<Client | null> {
    const clientDocRef: AngularFirestoreDocument<any> = this.afs.collection('clients').doc(clientId);
    return clientDocRef.get().toPromise().then(docSnapshot => {
      if (docSnapshot && docSnapshot.exists) {
        const data = docSnapshot.data() as Client;
        const id = docSnapshot.id;
        console.log('ID del cliente en el servicio:', id);
        return { id, ...data };
      } else {
        console.log('Cliente no encontrado en el servicio');
        return null;
      }
    });
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

  updateClient(id: string, data: any): Promise<void> {
    const clientDocRef = this.afs.doc(`clients/${id}`);

    // Verificar la existencia del documento antes de intentar la actualización
    return clientDocRef.get().toPromise().then((doc) => {
      if (doc!.exists) {
        return clientDocRef.update(data);
      } else {
        throw new Error("Documento no encontrado");
      }
    });
  }



//extras:
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
addClient(client: Client): Promise<DocumentReference<Client>> {
  return this.clientsCollection.add(client);
}


}
