import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../language.service';
// import { PopoverController } from '@ionic/angular/providers/popover-controller';
import { ModalController, PopoverController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-language',
  templateUrl: './language.page.html',
  styleUrls: ['./language.page.scss'],
})
export class LanguagePage implements OnInit {
 
  languages: any = []
  selected: any = ''
  constructor(private languageService: LanguageService,public popoverController:PopoverController, private api:ApiService,
    private translate:TranslateService,public router: Router,
    private modalController: ModalController) { }

  ngOnInit() {
    this.languages = this.languageService.getLanguage()
    // this.selected = this.languageService.selected
  }
  select(lng) {
    console.log("ppppp", lng);
    this.languageService.setLanguage(lng)
    this.popoverController.dismiss();

  }
}
