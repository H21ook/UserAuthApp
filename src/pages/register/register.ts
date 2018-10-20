import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { User } from '../../models/user';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { ProfileProvider } from '../../providers/profile/profile';
import { Profile } from '../../models/profile';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as User;
  profile = {} as Profile;
  registerForm: FormGroup;
  emailErrorHide = false;
  passErrorHide = false;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private authenticationProvider: AuthenticationProvider,
    private profileProvider: ProfileProvider,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  changeInputText(e) {
    if(e.target.name == "email")
      this.emailErrorHide = false;
    if(e.target.name == "password")
      this.passErrorHide = false;
  }
  get formFields() { return this.registerForm.controls; }

  closeErrorMsg(e) {
    if(e.target.parentNode.parentNode.parentNode.children[0].children[0].name == "email") { 
      this.emailErrorHide = true; 
    }
    if(e.target.parentNode.parentNode.parentNode.children[0].children[0].name == "password") {
      this.passErrorHide = true;
    }
      
  }
  ionViewDidLoad() {
    // body
  }

  register() {
    this.authenticationProvider.register(this.user)
    .then(() =>{
      this.profile.email = this.user.email;
      this.profile.sex = '1';
      this.profile.state = 'new';
      this.profileProvider.setProfile(this.profile);
      console.log("Amjilttai");
    },
    error=>{
      console.log(error);
    });
    this.navCtrl.pop();
  }
}
