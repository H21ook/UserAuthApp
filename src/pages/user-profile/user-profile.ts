import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profile } from '../../models/profile';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { ProfileProvider } from '../../providers/profile/profile';
import * as firebase from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
  private cameraOptions: CameraOptions;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private profileProvider: ProfileProvider,
    private camera: Camera
  ) {
    this.profileAFObser = this.profileProvider.getProfile(this.afAuth.auth.currentUser.uid);
    this.profileObser = this.profileAFObser.valueChanges();
    this.profileObser.subscribe((profile) => {

      this.profile = profile;
      if(this.profile.image != null)
         this.loadImage(this.profile.image)
    });

    this.cameraOptions = {
      quality: 100,
      targetWidth: 400,
      targetHeight: 400,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    };
  }

  ionViewDidLoad() {
  }

  loadImage(imageName) {
    var storageRef = firebase.storage().ref(imageName);
    storageRef.getDownloadURL().then((url) =>{
      this.avatarImage = url;
    });
  }

  selectPhoto() {
    this.cameraOptions.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
    this.camera.getPicture(this.cameraOptions).then((data) => {
      this.avatarImage = "data:image/jpeg;base64," + data;
    }, (err) => {
      console.log(err.message);
    });
  }

  takePhoto() {
    this.cameraOptions.sourceType = this.camera.PictureSourceType.CAMERA;
    this.camera.getPicture(this.cameraOptions).then((data) => {
      this.avatarImage = "data:image/jpeg;base64," + data;
    }, (err) => {
      console.log(err.message);
    });
  }

  saveProfileData() {
    const picture = firebase.storage().ref('avatar/image' + this.afAuth.auth.currentUser.uid);
    picture.putString(this.avatarImage, 'data_url');
    this.profile.image = 'avatar/image' + this.afAuth.auth.currentUser.uid;
    this.profileProvider.setProfile(this.profile);
    this.navCtrl.setRoot(HomePage);
  }
}