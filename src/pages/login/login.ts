import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProfileProvider } from '../../providers/profile/profile';
import { AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Profile } from '../../models/profile';
import { UserProfilePage } from '../user-profile/user-profile';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as User;
  profileAFObser: AngularFireObject<Profile>;
  profileObser: Observable<Profile>;
  loginError: any = '';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authenticationProvider: AuthenticationProvider,
    private afAuth: AngularFireAuth,
    private profileProvider: ProfileProvider
  ) { }

  ionViewDidLoad() {
    // body
  }

  login() {
    this.loginError = '';
    // this.user={ email: "tbeta40@gmail.com", password:"12345678"};
    this.authenticationProvider.login(this.user)
      .then(() => {
        this.profileAFObser = this.profileProvider.getProfile(this.afAuth.auth.currentUser.uid);
        this.profileObser = this.profileAFObser.valueChanges();

        this.profileObser.subscribe((profile) => {
          if (profile.state == "new")
            this.navCtrl.setRoot(UserProfilePage);
          else
            this.navCtrl.setRoot(HomePage);
        });
      },
        error => {
          if (error === 'The email address is badly formatted.')
            this.loginError = "Имэйл хаяг буруу бүтэцтэй байна!";
          else if (error === 'There is no user record corresponding to this identifier. The user may have been deleted.')
            this.loginError = "Бүртгэлгүй хаяг байна!";
          else if (error === 'A network error (such as timeout, interrupted connection or unreachable host) has occurred.')
            this.loginError = "Интернэт холболт салсан байна";
          else if(error === 'The password is invalid or the user does not have a password.' || 'Too many unsuccessful login attempts.  Please include reCaptcha verification or try again later')
            this.loginError = "Нууц үг буруу байна!";
          else
            this.loginError = error;
        });
  }

  goToRegister() {
    this.navCtrl.push(RegisterPage);
  }
}
