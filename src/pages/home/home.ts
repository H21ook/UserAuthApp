import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthenticationProvider } from '../../providers/authentication/authentication';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private authenticationProvider: AuthenticationProvider) {
  }

  ionViewDidLoad() {
    // body
  } 

  logout() {
    this.authenticationProvider.logOut();
    this.navCtrl.setRoot(LoginPage);
  }
}
