import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//Native
import { Camera } from '@ionic-native/camera';
//Native
import { MyApp } from './app.component';
//Firebase 
import { FIREBASE_CONFIG } from '../app/firebase.config';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
//Firebase
//Pages
import { HomePageModule } from '../pages/home/home.module';
import { LoginPageModule } from '../pages/login/login.module';
import { RegisterPageModule } from '../pages/register/register.module';
import { UserProfilePageModule } from '../pages/user-profile/user-profile.module';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { ProfileProvider } from '../providers/profile/profile';
import { ValidatorProvider } from '../providers/validator/validator';
//Pages

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicModule.forRoot(MyApp),
    HomePageModule,
    LoginPageModule,
    RegisterPageModule,
    UserProfilePageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthenticationProvider,
    ProfileProvider,
    ValidatorProvider
  ]
})
export class AppModule {}
