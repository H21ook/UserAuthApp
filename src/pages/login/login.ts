import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
// import { ProfileProvider } from '../../providers/profile/profile';
import { AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';
// import { Profile } from '../../models/profile';
import { UserProfilePage } from '../user-profile/user-profile';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as User;
  // profileAFObser: AngularFireObject<Profile>;
  // profileObser: Observable<Profile>;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private authenticationProvider: AuthenticationProvider,
    private afAuth: AngularFireAuth,
    // private profileProvider: ProfileProvider
  ) { }

  ionViewDidLoad() {
    // body
  }

  login() {
    
    this.authenticationProvider.login(this.user)
    .then(() => {
      this.navCtrl.setRoot(HomePage);
          // this.profileAFObser = this.profileProvider.getProfile(this.afAuth.auth.currentUser.uid);
          // this.profileObser = this.profileAFObser.valueChanges();
          // this.profileObser.subscribe((profile) => {
          //   if(profile.state == null)
          //     this.navCtrl.setRoot(UserProfilePage);
          //   else 
          //     this.navCtrl.setRoot(HomePage);
          // });
    },
    error=>{
      console.log(error.message);
    });
  }

  goToRegister() {
      this.navCtrl.push(RegisterPage);
  }
}
