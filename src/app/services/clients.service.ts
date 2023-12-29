import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentData, DocumentReference } from '@angular/fire/compat/firestore';
import Client from 'src/interfaces/clients.interface';
import 'rxjs/operators';

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
    const clientDocRef = this.clientsCollection.doc(client.id).ref;
    return clientDocRef.delete();
  }


}
