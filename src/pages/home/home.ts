import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { RestProvider } from '../../providers/rest/rest';
import { AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { Profile } from '../../models/profile';
import { ProfileProvider } from '../../providers/profile/profile';
import { AngularFireAuth } from 'angularfire2/auth';


import { ToastController, Slides } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { ViewChild } from '@angular/core';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  userinfo: any;
  
  avatarImage = '../../assets/imgs/male-user.png';
  private profileAFObser: AngularFireObject<Profile>;
  private profileObser: Observable<Profile>;
  private profile = {} as Profile;


  private weather: any;
  private forecastdays: any = [];
  private forecastPreData: any = [];
  private weekday = ["Ням", "Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан", "Бямба"];

  @ViewChild('mySlider') slider: Slides;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private profileProvider: ProfileProvider,
    private afAuth: AngularFireAuth,
    private authenticationProvider: AuthenticationProvider,
    private weatherProvider: WeatherProvider,
    private toast: ToastController,
    private rest: RestProvider
  ) {

    this.profileAFObser = this.profileProvider.getProfile(this.afAuth.auth.currentUser.uid);
    this.profileObser = this.profileAFObser.valueChanges();
    this.profileObser.subscribe((profile) => {
      this.profile = profile;
      console.log(this.profile.image);
      if (this.profile.image != null)
        this.loadImage(this.profile.image);
      else {
        if(this.profile.sex == '0')
          this.avatarImage = '../../assets/imgs/woman-avatar.png';
      }
    });
  }
 


  ionViewDidLoad() {
    this.rest.getUserInfo1();

    this.weatherProvider.getWeater('Ulaanbaatar').subscribe(data => {
      this.weather = data;
    });

    this.weatherProvider.getForecastWeater('Ulaanbaatar').subscribe(data => {
      let weatherForecast: any = data;

      let forecastday = [], dt,dtTemp,k = -1;

      dt = new Date();

      for(let i = 0; i < weatherForecast.list.length; i++) {
        dtTemp = new Date((weatherForecast.list[i].dt * 1000) - (8 * 60 * 60 * 1000));
        if(dt.getDate() == dtTemp.getDate() && k == -1) {
          k = 0;
        }
        if(k < 5 && k > -1)
          if(dt.getDate() == dtTemp.getDate())
          {
            forecastday.push(weatherForecast.list[i]);
          }
          else {
            this.forecastdays.push(forecastday.slice());
            forecastday = [];
            k++;

            dt = new Date((weatherForecast.list[i].dt * 1000) - (8 * 60 * 60 * 1000));
            forecastday.push(weatherForecast.list[i]);
          }
      }
      
      forecastday = [];
      this.getPrepareData(this.forecastdays);
      
      console.log("ForecastData", this.forecastPreData);
    });
  } 

  getPrepareData(datas){
    let date;
    let param : any;
    let totalTemp = 0, totalHumidity = 0, totalWindSpeed = 0;
    let minTemp:any, maxTemp:any;

    for(let i = 0; i < datas.length; i++)
    {
      minTemp = datas[i][0].main.temp;
      maxTemp = datas[i][0].main.temp;

      for(let j = 0; j < datas[i].length; j++) {
        totalTemp += datas[i][j].main.temp; 
        totalHumidity += datas[i][j].main.humidity;
        totalWindSpeed += datas[i][j].wind.speed;

        if(minTemp > datas[i][j].main.temp)
          minTemp = datas[i][j].main.temp;
        if(maxTemp < datas[i][j].main.temp)
          maxTemp = datas[i][j].main.temp;
      }

      date = new Date((datas[i][0].dt * 1000) - (8 * 60 * 60 * 1000));
      var options = { year: 'numeric', month: 'numeric', day: 'numeric' };

      if(i == 0) {
        param = {
          date: this.weekday[date.getDay()],
          dateFull: date.toLocaleDateString('en-GB', options),
          weather: this.weather.weather,
          temp: this.weather.main.temp,
          humidity: this.weather.main.humidity,
          windSpeed:this.weather.wind.speed,
          temp_min: Math.round(minTemp),
          temp_max: Math.round(maxTemp),
        }
      }
      else {
        
        param = {
          date: this.weekday[date.getDay()],
          dateFull: date.toLocaleDateString('en-GB', options),
          weather: datas[i][3].weather,
          temp: Math.round(totalTemp / datas[i].length),
          humidity: Math.round(totalHumidity / datas[i].length),
          windSpeed: Math.round(totalWindSpeed / datas[i].length),
          temp_min: Math.round(minTemp),
          temp_max: Math.round(maxTemp)
        }
      }

      this.forecastPreData.push(param);

      totalTemp = 0;
      totalHumidity = 0; 
      totalWindSpeed = 0;
      minTemp = 0;
      maxTemp = 0;
      param = {};
    }
    
  }

  changeDay(e: number) {
    if (e != this.slider.getActiveIndex())
      this.slider.slideTo(e, 300);
  }

  presentToast(opt?) {
    let toast;
    if(opt)
      toast = this.toast.create(opt);
    else
      toast = this.toast.create({
        message: "OK",
        duration: 2000,
        position: 'top'
      });
    toast.present();
  }






  loadImage(imageName) {
    var storageRef = firebase.storage().ref(imageName);
    storageRef.getDownloadURL().then((url) => {
      this.avatarImage = url;
    });
  }

  logout() {
    this.authenticationProvider.logOut();
    this.navCtrl.setRoot(LoginPage);
  }
}
