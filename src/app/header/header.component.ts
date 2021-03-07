import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    user: firebase.User;
    constructor(
        private afAuth: AngularFireAuth
    ) { }

    ngOnInit() {
        this.afAuth.user.subscribe((usuario) => {
            if (usuario) {
                console.log(usuario);
            }
            this.user = usuario;
        })
    }

    logout() {
        this.afAuth.signOut();
    }
}
