import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, Content } from 'ionic-angular';

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

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, db: AngularFireDatabase, public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController) {
    this.usuario = this.navParams.get('usuario');
    this.email = this.navParams.get('email');

    this.mensajes = db.list('/mensajesA');
  }
  //////////para ir al fondo de la pantalla
  ionViewDidLoad() {
    let dimensions = this.content.getContentDimensions();
    this.content.scrollTo(100, dimensions.scrollHeight + 1000, 100);
  }
  ionViewDidEnter() {
    let dimensions = this.content.getContentDimensions();
    this.content.scrollTo(100, dimensions.contentHeight + 1000, 100);
  }
  //////////////////
  enviarMensaje() {
    if (this.mensaje != null && this.mensaje != "") {
      var hora = new Date();
      this.mensajes.push({ usuario: this.usuario, mens: this.mensaje, hora: (hora.getHours() + ":" + hora.getMinutes()) });
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

}
