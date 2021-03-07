import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'insumosmerlo';
    user: firebase.User;
    cargando: boolean = true;
    constructor(
        public afAuth: AngularFireAuth
    ) {
        afAuth.user.subscribe((usuario) => {
            if (usuario) {
                console.log(usuario);
            }
            this.user = usuario;
            this.cargando = false;
        })
    }
}
