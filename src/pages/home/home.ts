import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AulaAPage } from '../aula-a/aula-a';
import { AulaBPage } from '../aula-b/aula-b';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  usuario: string;
  email: string;
  pass: string;

  usuarios: FirebaseListObservable<any>;

  testRadioOpen: boolean;
  testRadioResult;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, db: AngularFireDatabase, ) {
    this.usuarios = db.list('/usuarios');
    console.log(this.usuarios);
  }
  login() {
    this.usuarios.forEach(element => {
      for (var i = 0; i < 5; i++) {
        if (element[i].nombre == this.usuario && element[i].clave == this.pass) {
          //SE ENCONTRO USUARIO
          let alert = this.alertCtrl.create();
          alert.setTitle('Eleccion de aula');

          alert.addInput({
            type: 'radio',
            label: 'PPS-4A',
            value: 'a',
            checked: true
          });

          alert.addInput({
            type: 'radio',
            label: 'PPS-4B',
            value: 'b',
          });

          alert.addButton('Cancelar');
          alert.addButton({
            text: 'OK',
            handler: data => {
              if (data == 'a') {
                this.navCtrl.push(AulaAPage, { "usuario": this.usuario, "email": this.email });
              }
              else {
                this.navCtrl.push(AulaBPage, { "usuario": this.usuario, "email": this.email });
              }
              console.log('Radio data:', data);
              this.testRadioOpen = false;
              this.testRadioResult = data;
            }
          });
          alert.present().then(() => {
            this.testRadioOpen = true;
          });
          return;
        }

      }
      //NO SE ENCONTRO USUARIO
      let alert = this.alertCtrl.create({
        title: 'No se encontro el usuario',
        subTitle: 'Usuario o contraseña incorrectos, por favor verifique!',
        buttons: ['OK']
      });
      alert.present();
      this.usuario = "";
      this.email = "";
      this.pass = "";
    })
    /*VERIFICACION FICTICIA
    if (this.usuario == "admin" && this.pass == "admin") {
      let alert = this.alertCtrl.create({
        title: 'Usuario valido!' + this.usuario,
        subTitle: 'Bienvenido a la aplicacion!',
        buttons: ['OK']
      });
      alert.present();
      this.navCtrl.push(AplicacionPage, { "usuario": this.usuario, "pass": this.pass });

    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Usuario no valido!',
        subTitle: 'Por favor registrese',
        buttons: ['NO']
      });
      alert.present();
      this.usuario = "";
      this.email = "";
      this.pass = "";
    }*/
  }
}
