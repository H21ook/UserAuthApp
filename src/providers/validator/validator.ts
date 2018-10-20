import { Injectable } from '@angular/core';

@Injectable()
export class ValidatorProvider {

  constructor() {
  }

  nameValidate(name:string){
    const regex = /^([a-zA-Z]+)$/;
    if(name.length >= 2 && name.length < 35){
      if(regex.test(name))
        return "";
      else
        return "a-z, A-Z үсэг хэрэглэнэ үү!";
    }
    else{
      return "Нэр хэт урт эсвэл богино байна";
    }
  }

  registerValidate(register:string){
    const regex = /^[0-9]{8}$/;
    const alph = "фцужэнгшүзкъещйыбөахролдпячёсмитьвюФЦУЖЭНГШҮЗКЪЕЩЙЫБӨАХРОЛДПЯЧЁСМИТЬВЮ";
    if(register.length == 10){
      if(regex.test(register.substring(2, 10))){
        
        let count = 0;
        for(let j = 0; j < 2; j++) {
          let exp = false;
          let i = 0;
          while(alph.length > i && !exp) {
            if(register[j] == alph[i]) {
              exp = true;
              count++;
            }
            i++;
          }
        }
        if(count == 2)
          return "";
        else {
          return "А-Я үсэг хэрэглэнэ үү!"
        }
      }
      else
        return "Регистерийн дугаар буруу байна!";
    }
    else{
      return "Регистерийн дугаар буруу байна!";
    }
  }

  ageValidate(age: number){
    if(age < 130 && age > 5){
        return "";
    }
    else{
      return "Нас буруу байна!";
    }
  }

}
