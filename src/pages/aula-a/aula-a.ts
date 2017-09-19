import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.usuario = this.navParams.get('usuario');
    this.email = this.navParams.get('email');
  }

  salir() {
    this.navCtrl.push(HomePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AulaAPage');
  }

}
