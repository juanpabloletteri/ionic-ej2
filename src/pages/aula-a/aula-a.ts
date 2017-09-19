import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
/**
 * Generated class for the AulaAPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aula-a',
  templateUrl: 'aula-a.html',
})
export class AulaAPage {

  usuario: string;
  email: string;

  mensaje: string;
  mensajes: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, db: AngularFireDatabase) {
    this.usuario = this.navParams.get('usuario');
    this.email = this.navParams.get('email');

    this.mensajes = db.list('/mensajesA');
  }

  enviarMensaje() {
    this.mensajes.push({ usuario: this.usuario, mens: this.mensaje });
    this.mensaje = "";
  }

  salir() {
    this.navCtrl.push(HomePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AulaAPage');
  }

}
