import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './language.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(http: HttpClient, private translate: TranslateService,private languageService:LanguageService) {
    this.initializeApp()
  }
  initializeApp() {
    this.translate.setDefaultLang('en'); // add this
    this.languageService.setInitialLanguage()
  }
}
  