import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
// import { AngularFireDatabase } from 'angularfire2/database';
// import { AngularFireAuth } from 'angularfire2/auth';
// //import * as firebase from 'firebase';

@Injectable()
export class PhotoProvider {
//   cameraImage : String;

  constructor(
//     private afd: AngularFireDatabase,
//     private afAuth: AngularFireAuth,
    private camera: Camera
  ) { }

  selectImage() : Promise<any>
  {
      return new Promise(resolve =>
      {
         let cameraOptions : CameraOptions = {
             sourceType         : this.camera.PictureSourceType.PHOTOLIBRARY,
             destinationType    : this.camera.DestinationType.DATA_URL,
             quality            : 100,
             targetWidth        : 400,
             targetHeight       : 400,
             encodingType       : this.camera.EncodingType.JPEG,
             correctOrientation : true
         };
         this.camera.getPicture(cameraOptions).then((data) => {
            let base64Image = "data:image/jpeg;base64," + data;
            resolve(base64Image);
         });
      });
  }

  // uploadImage(imageString) : Promise<any>
  //  {
  //     let image       : string,
  //         storageRef  : any,
  //         parseUpload : any;
      
  //     this.afAuth.authState.subscribe(auth => {
  //       image = 'avatar'+auth.uid+'.jpg';
  //     });

  //     return new Promise((resolve, reject) =>
  //     {
  //        storageRef       = firebase.storage().ref('avatar/' + image);
  //        parseUpload      = storageRef.putString(imageString, 'data_url');

  //        parseUpload.on('state_changed', (_snapshot) =>
  //        {
  //           // We could log the progress here IF necessary
  //           // console.log('snapshot progess ' + _snapshot);
  //        },
  //        (_err) =>
  //        {
  //           reject(_err);
  //        },
  //        (success) =>
  //        {
  //           resolve(parseUpload.snapshot);
  //        });
  //     });
  //  }
}
