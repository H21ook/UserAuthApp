import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RestProvider {
  constructor(public http: HttpClient) { 
  }
  
  getUserInfo() {
    return this.http.get('http://rest.transdep.mn:7879/Mobile/Service.asmx/get_Login?username=test&password=99002911', {
      headers: new HttpHeaders()
      .set('Content-Type', 'text/xml') 
      .append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS') 
      .append('Access-Control-Allow-Origin', '*')
      .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method")
, responseType:'text'})
    // return this.http.get('https://jsonplaceholder.typicode.com/users')
    .map(res => res);
  }

  getUserInfo1() {
    const url = 'http://rest.transdep.mn:7879/Mobile/Service.asmx/get_Login?username=test&password=99002911';
    var xhr = new XMLHttpRequest();

    xhr.open('GET',url, true);
    xhr.setRequestHeader('Access-Control-Allow-Origin','*');
    xhr.setRequestHeader('Content-type','application/json');
    xhr.setRequestHeader('Access-Control-Allow-Methods','GET');
    xhr.send();

    xhr.onreadystatechange = function() {
        if (this.status == 200) {
            let result = xhr.responseType;
            console.log(result);
        }
    };
  }
}
