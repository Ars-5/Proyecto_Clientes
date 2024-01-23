import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject, StorageReference } from 'firebase/storage';

import { ActivatedRoute } from '@angular/router';
import { ClientsService } from '../services/clients.service';
import Client from 'src/interfaces/clients.interface';

@Component({
  selector: 'app-detalles-client',
  templateUrl: './detalles-client.component.html',
  styleUrls: ['./detalles-client.component.scss']
})
export class DetallesClientComponent {
  clienteId!: string;
  archivos: Archivo[] = [];
  images: Image[] = [];
  loading = false;
  loadingImg = false;
  clienteNombre: string = '';
  equipoCliente: string = '';

  constructor(
    private angularFireStorage: AngularFireStorage,
    private route: ActivatedRoute,
    private clientsService: ClientsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.clienteId = params['id'];
      this.cargarImagenesCliente();
      this.cargarArchivosCliente();
      this.cargarDatosCliente();
    });
  }

  async cargarDatosCliente() {
    try {
      const cliente: Client | null = await this.clientsService.getClient(this.clienteId);

      if (cliente) {
        this.clienteNombre = cliente.cliente;
        this.equipoCliente = cliente.equipo;
      } else {
        console.error('Cliente no encontrado en el servicio');
      }
    } catch (error) {
      console.error('Error al cargar los datos del cliente:', error);
    }
  }

  subirArchivo($event: any) {
    const file = $event.target.files[0];
    if (file) {
      const firebaseStorage: any = this.angularFireStorage.storage;
      const archivoRef = ref(firebaseStorage, `clients/${this.clienteId}/archivos/${file.name}`);
      this.loading = true;
      uploadBytes(archivoRef, file)
        .then(response => {
          console.log(response);
          this.loading = false;
          // Puedes realizar acciones adicionales después de subir el archivo si es necesario
          this.cargarArchivosCliente(); // Actualizar la lista después de subir un nuevo archivo
        })
        .catch(error => console.log(error));
    }
  }

  async cargarArchivosCliente() {
    const firebaseStorage: any = this.angularFireStorage.storage;
    const archivosFolderRef = ref(firebaseStorage, `clients/${this.clienteId}/archivos/`);
    try {
      const result = await listAll(archivosFolderRef);
      const promises = result.items.map(async (item) => ({
        url: await getDownloadURL(item),
        name: item.name
      }));
      this.archivos = await Promise.all(promises);
    } catch (error) {
      console.log(error);
    }
  }

  descargarArchivo(url: string, nombre: string) {
    window.open(url, '_blank');
  }

  eliminarArchivo(nombre: string) {
    const firebaseStorage: any = this.angularFireStorage.storage;
    const archivoRef = ref(firebaseStorage, `clients/${this.clienteId}/archivos/${nombre}`);

    deleteObject(archivoRef)
      .then(() => {
        console.log('Archivo eliminado exitosamente.');
        this.cargarArchivosCliente(); // Actualizar la lista después de eliminar un archivo
      })
      .catch(error => console.log(error));
  }


  subirImagen($event: any) {
    const file = $event.target.files[0];
    console.log(file);
    this.loadingImg = true;
    const firebaseStorage: any = this.angularFireStorage.storage;
    const imgRef: StorageReference = ref(firebaseStorage, `clients/${this.clienteId}/images/${file.name}`);

    uploadBytes(imgRef, file)
      .then(response => {
        console.log(response);
        this.cargarImagenesCliente();
        this.loadingImg = false;
      })
      .catch(error => console.log(error));
  }

  async cargarImagenesCliente() {
    const firebaseStorage: any = this.angularFireStorage.storage;
    const imagesFolderRef = ref(firebaseStorage, `clients/${this.clienteId}/images/`);
    try {
      const result = await listAll(imagesFolderRef);
      const promises = result.items.map(async (item) => ({
        url: await getDownloadURL(item),
        name: item.name
      }));
      this.images = await Promise.all(promises);
    } catch (error) {
      console.log(error);
    }
  }


  descargarImagen(url: string, nombre: string) {
    window.open(url, '_blank');
  }

  eliminarImagen(nombre: string) {
    const firebaseStorage: any = this.angularFireStorage.storage;
    const imgRef: StorageReference = ref(firebaseStorage, `clients/${this.clienteId}/images/${nombre}`);

    deleteObject(imgRef)
      .then(() => {
        console.log('Imagen eliminada exitosamente.');
        this.cargarImagenesCliente();
      })
      .catch(error => console.log(error));
  }
}

interface Archivo {
  url: string;
  name: string;
}

interface Image {
  url: string;
  name: string;
}
