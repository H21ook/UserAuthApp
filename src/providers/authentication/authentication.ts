import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user';

@Injectable()
export class AuthenticationProvider {
  constructor(private afAuth: AngularFireAuth) { }

  login(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afAuth
        .auth
        .signInWithEmailAndPassword(user.email, user.password)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  }

  register(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afAuth
        .auth
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  }

  logOut(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signOut()
        .then((data: any) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  }
}
