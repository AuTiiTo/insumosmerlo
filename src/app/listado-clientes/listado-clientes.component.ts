import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
    selector: 'app-listado-clientes',
    templateUrl: './listado-clientes.component.html',
    styleUrls: ['./listado-clientes.component.scss']
})
export class ListadoClientesComponent implements OnInit {

    userEmail: string = "test@test.com";
    userPhone: string = "11-21221232";
    searchForm: FormGroup;
    clientes: any[] = new Array<any>();

    constructor(
        private formBuilder: FormBuilder,
        private db: AngularFirestore
    ) { }

    ngOnInit() {
        this.searchForm = this.formBuilder.group({
            search: ['', null]
        });
        this.db.collection('clientes').get().subscribe((result) => {
            console.log(result.docs);
            result.docs.forEach((item)=>{
                console.log(item.id);
                console.log(item.data());
                console.log(item.ref);
                let cliente: any = item.data();
                cliente.id = item.id;
                cliente.ref = item.ref;
                this.clientes.push(cliente);
            })
        })
    }

}
