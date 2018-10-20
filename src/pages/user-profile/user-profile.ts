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
import { ValidatorProvider } from '../../providers/validator/validator';

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
  private profileAFObser: AngularFireObject<Profile>;
  private profileObser: Observable<Profile>;
  private profile = {} as Profile;
  private avatarImage = null;
  private cameraOptions: CameraOptions;
  formErrors = {
    fnameError: '',
    lnameError: '',
    registerError: '',
    ageError: '',
  };
  checkPhoto = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private profileProvider: ProfileProvider,
    private camera: Camera,
    private validator: ValidatorProvider
  ) {
    this.profileAFObser = this.profileProvider.getProfile(this.afAuth.auth.currentUser.uid);
    this.profileObser = this.profileAFObser.valueChanges();
    this.profileObser.subscribe((profile) => {

      this.profile = profile;
      if (this.profile.image != null)
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
  isRequired() {
    if (this.profile.firstName)
      return true;
    else
      return false
  }

  validFn() {
    this.formErrors.fnameError = this.validator.nameValidate(this.profile.firstName);
  }
  validLn() {
    this.formErrors.lnameError = this.validator.nameValidate(this.profile.lastName);
  }
  validRegN() {
    this.formErrors.registerError = this.validator.registerValidate(this.profile.registerNumber);
  }
  validAge() {
    this.formErrors.ageError = this.validator.ageValidate(parseInt(this.profile.age));
  }
  
  ionViewDidLoad() {

  }

  loadImage(imageName) {
    var storageRef = firebase.storage().ref(imageName);
    storageRef.getDownloadURL().then((url) => {
      this.avatarImage = url;
    });
  }

  selectPhoto() {
    this.checkPhoto = true;
    this.cameraOptions.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
    this.camera.getPicture(this.cameraOptions).then((data) => {
      this.avatarImage = "data:image/jpeg;base64," + data;
    }, (err) => {
      console.log(err.message);
    });
  }

  takePhoto() {
    this.checkPhoto = true;
    this.cameraOptions.sourceType = this.camera.PictureSourceType.CAMERA;
    this.camera.getPicture(this.cameraOptions).then((data) => {
      this.avatarImage = "data:image/jpeg;base64," + data;
    }, (err) => {
      console.log(err.message);
    });
  }

  checkFormError() {
    if (this.formErrors.registerError &&
      this.formErrors.ageError &&
      this.formErrors.fnameError &&
      this.formErrors.lnameError)
      return false;
    else
      return true;
  }

  saveProfileData() {
    if (this.checkFormError()) {
      this.profile.state = "old";
      if(this.checkPhoto) {
        const picture = firebase.storage().ref('avatar/image' + this.afAuth.auth.currentUser.uid);
        picture.putString(this.avatarImage, 'data_url');
        this.profile.image = 'avatar/image' + this.afAuth.auth.currentUser.uid;
      }
      this.profileProvider.setProfile(this.profile);
      this.navCtrl.setRoot(HomePage);
    }
    else {

    }
  }
}