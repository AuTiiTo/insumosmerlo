import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-listado-productos',
    templateUrl: './listado-productos.component.html',
    styleUrls: ['./listado-productos.component.scss']
})
export class ListadoProductosComponent implements OnInit {
    searchForm: FormGroup;
    productos: any[] = new Array<any>();

    constructor(
        private formBuilder: FormBuilder,
        private db: AngularFirestore
    ) { }

    ngOnInit() {
        this.searchForm = this.formBuilder.group({
            search: ['', null]
        });
        this.db.collection('productos').get().subscribe((result) => {
            console.log(result.docs);
            result.docs.forEach((item)=>{
                console.log(item.id);
                console.log(item.data());
                console.log(item.ref);
                let producto: any = item.data();
                producto.id = item.id;
                producto.ref = item.ref;
                this.productos.push(producto);
            })
        })
    }

}
