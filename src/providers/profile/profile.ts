import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireObject } from 'angularfire2/database'
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class ProfileProvider {
  constructor(
    private afd: AngularFireDatabase,
    private afAuth: AngularFireAuth) {
  }

  getProfile(userID): AngularFireObject<any> {
    return this.afd.object('/profile/' + userID);
  }

  setProfile(profile) {
    this.afAuth.authState.subscribe(auth => {
      this.afd.object('/profile/' + auth.uid).set(profile);
    })
  }

}
