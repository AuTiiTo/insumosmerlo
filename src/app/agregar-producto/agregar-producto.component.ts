import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-agregar-producto',
    templateUrl: './agregar-producto.component.html',
    styleUrls: ['./agregar-producto.component.scss']
})
export class AgregarProductoComponent implements OnInit {
    porcentajeSubida = 0;
    formularioProducto: FormGroup;
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
        this.formularioProducto = this.formBuilder.group({
            descripcion: ['', Validators.required],
            precio: ['', Validators.required],
            costo: ['', Validators.required],
            stock: ['', Validators.required],
            urlImage: ['']
        });
        let productId = this.activeRoute.snapshot.params.productId;
        if(productId != null) {
            this.isEditable = true;
            this.itemDoc = this.firestore.doc<any>('productos/'+productId);
            this.itemDoc.valueChanges().subscribe((producto) => {
                this.formularioProducto.setValue({
                    descripcion: producto.descripcion,
                    precio: producto.precio,
                    costo: producto.costo,
                    stock: producto.stock,
                    urlImage: ''
                })
            })
        } else {
            this.isEditable = false;
            console.log("agregar producto");
        }
    }

    agregar() {
        if(this.urlImage) {
            this.formularioProducto.value.urlImage = this.urlImage;
        }
        this.firestore.collection('productos').add(this.formularioProducto.value)
        .then((result) => {
            console.log('producto creado');
        });
    }

    editar() {
        if(this.urlImage) {
            this.formularioProducto.value.urlImage = this.urlImage;
        }
        this.itemDoc.update(this.formularioProducto.value).then((result)=>{
            console.log("producto editado");
        })
    }

    subirImagen(event) {
        if(event.target.files.length > 0) {
            console.log(event);
            let nombre = new Date().getTime().toString();
            let file = event.target.files[0];
            nombre += file.name.toString().substring(file.name.toString().lastIndexOf('.'));
            console.log(file);
            let ruta = 'productos/' + nombre;
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
