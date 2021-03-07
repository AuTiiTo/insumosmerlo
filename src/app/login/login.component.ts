import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    fbLogin: FormGroup;
    datosCorrectos: boolean = true;
    loginText: string = "Por favor verifique los datos ingresados";
    constructor(
        public formBuilder: FormBuilder,
        public afAuth: AngularFireAuth,
        private spiner: NgxSpinnerService
    ) { }

    ngOnInit() {
        this.fbLogin = this.formBuilder.group({
            email: ['', Validators.compose([ 
                Validators.required,
                Validators.email
            ])],
            password: ['', Validators.required]
        });
    }

    tryLogin() {
        if(this.fbLogin.valid){
            this.datosCorrectos = true;
            this.spiner.show();
            this.afAuth.signInWithEmailAndPassword(this.fbLogin.value.email, this.fbLogin.value.password)
            .then((user) => {
                console.log(user);
                this.spiner.hide();      
            })
            .catch((error) => {
                console.log(error.message);
                this.datosCorrectos = false;
                this.loginText = error.message;
                this.spiner.hide();
            })
        }
    }
}
