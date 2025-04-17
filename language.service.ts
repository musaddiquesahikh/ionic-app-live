import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { TranslateService } from "@ngx-translate/core";

// const LNG_KEY = 'SELECTED_LANGUAGE'

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  selected = ''
  constructor(private translate: TranslateService, private plt: Platform) { }

  setInitialLanguage() {
    let language = this.translate.getBrowserLang();
    this.translate.setDefaultLang('en')


  }
  getLanguage() {
    return [
      { text1:'En', text: 'En- English', value: 'en' },
      { text: 'म-  मराठी', value: 'mr' },
      { text: 'हिं-  हिंदी', value: 'hi' },
      { text: 'ગુ-  ગુજરાતી', value: 'gu' }
    ]
  }
  setLanguage(lng) {
    this.translate.use(lng)
    this.selected = lng;
console.log("jjj",lng);

  }
}
