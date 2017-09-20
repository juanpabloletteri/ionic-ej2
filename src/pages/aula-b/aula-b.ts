import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';

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
  selector: 'page-aula-b',
  templateUrl: 'aula-b.html',
})
export class AulaBPage {

  usuario: string;
  email: string;

  mensaje: string;
  mensajes: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, db: AngularFireDatabase, public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController) {
    this.usuario = this.navParams.get('usuario');
    this.email = this.navParams.get('email');

    this.mensajes = db.list('/mensajesB');
  }

  enviarMensaje() {
    if (this.mensaje != null) {
      this.mensajes.push({ usuario: this.usuario, mens: this.mensaje });
      this.mensaje = "";
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Mensaje vacio',
        subTitle: 'Por favor introduzca mensaje a enviar',
        buttons: ['OK']
      });
      alert.present();
    }

  }

  menu(id, mens) {
    console.log(id + mens);
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Desea borrar el mensaje? ' + mens,
      buttons: [
        {
          text: 'Borrar',
          role: 'destructive',
          handler: () => {
            this.mensajes.remove(id);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  salir() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AulaAPage');
  }

}
