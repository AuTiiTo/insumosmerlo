import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-agregar-cliente',
    templateUrl: './agregar-cliente.component.html',
    styleUrls: ['./agregar-cliente.component.scss']
})
export class AgregarClienteComponent implements OnInit {
    porcentajeSubida = 0;
    formularioCliente: FormGroup;
    urlImage: string;
    isEditable: boolean = false;
    itemDoc: any;

    constructor(
        private formBuilder: FormBuilder,
        private fireStorega: AngularFireStorage,
        private firestore: AngularFirestore,
        private activeRoute: ActivatedRoute
    ) { }
 
    ngOnInit(): void {
        this.formularioCliente = this.formBuilder.group({
            nombre: ['', Validators.required],
            apellido: ['', Validators.required],
            email: ['', Validators.compose([
                Validators.required, Validators.email
            ])],
            telefono: [''],
            urlImage: ['']
        });
        let clientId = this.activeRoute.snapshot.params.clientId;
        if(clientId != null) {
            this.isEditable = true;
            this.itemDoc = this.firestore.doc<any>('clientes/'+clientId);
            this.itemDoc.valueChanges().subscribe((cliente) => {
                this.formularioCliente.setValue({
                    nombre: cliente.nombre,
                    apellido: cliente.apellido,
                    email: cliente.email,
                    telefono: cliente.telefono,
                    urlImage: ''
                })
            })
        } else {
            this.isEditable = false;
            console.log("agregar cliente");
        }
    }

    agregar() {
        if(this.urlImage) {
            this.formularioCliente.value.urlImage = this.urlImage;
        }
        this.firestore.collection('clientes').add(this.formularioCliente.value)
        .then((result) => {
            console.log('cliente creado');
        });
    }

    editar() {
        if(this.urlImage) {
            this.formularioCliente.value.urlImage = this.urlImage;
        }
        this.itemDoc.update(this.formularioCliente.value).then((result)=>{
            console.log("cliente editado");
        })
    }

    subirImagen(event) {
        if(event.target.files.length > 0) {
            console.log(event);
            let nombre = new Date().getTime().toString();
            let file = event.target.files[0];
            nombre += file.name.toString().substring(file.name.toString().lastIndexOf('.'));
            console.log(file);
            let ruta = 'clientes/' + nombre;
            const referencia = this.fireStorega.ref(ruta);
            const tarea = referencia.put(file);
            tarea.percentageChanges().subscribe((porcentaje)=>{
                this.porcentajeSubida = parseInt(porcentaje.toString());
            });
            tarea.then((resp)=>{
                console.log(resp);
                referencia.getDownloadURL().subscribe((url)=>{
                    console.log(url);
                    this.urlImage = url;
                });
            });
        }
    }
}
