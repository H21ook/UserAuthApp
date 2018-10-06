import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { User } from '../../models/user';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
// import { ProfileProvider } from '../../providers/profile/profile';
// import { Profile } from '../../models/profile';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as User;
  // profile = {} as Profile;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private authenticationProvider: AuthenticationProvider,
    // private profileProvider: ProfileProvider
  ) { }

  ionViewDidLoad() {
    // body
  }

  register() {
    this.authenticationProvider.register(this.user)
    .then(() =>{
      // this.profile.email = this.user.email;
      // this.profileProvider.setProfile(this.profile);
      console.log("Amjilttai");
    },
    error=>{
      console.log(error.message);
    });
    this.navCtrl.pop();
  }
}
