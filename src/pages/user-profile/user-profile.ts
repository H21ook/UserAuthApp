import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profile } from '../../models/profile';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';
// import { ProfileProvider } from '../../providers/profile/profile';
// import { PhotoProvider } from '../../providers/photo/photo';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
  profileAFObser: AngularFireObject<Profile>;
  profileObser: Observable<Profile>;
  profile = {} as Profile;
  avatarImage = null;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    // private profileProvider: ProfileProvider,
    // private photoProvider: PhotoProvider
  ) {
    // this.profileAFObser = this.profileProvider.getProfile(this.afAuth.auth.currentUser.uid);
    // this.profileObser = this.profileAFObser.valueChanges();
    // this.profileObser.subscribe((profile) => {
    //   this.profile = profile;
    //   this.profile.image="asdfgfsdgsdf";
    //   this.profile.sex = "1";
    //   if(this.profile.image != null)
    //      this.loadImage(this.profile.image)
    // });
  }

  ionViewDidLoad() {
  }

  loadImage(imageName) {
    var storageRef = firebase.storage().ref(imageName);
    storageRef.getDownloadURL().then((url) =>{
      this.avatarImage = url;
    });
  }

  selectImage()
  {
    // console.log(this.photoProvider.selectImage());
  }

  saveProfileData() {
    this.navCtrl.setRoot(HomePage);
  }
}