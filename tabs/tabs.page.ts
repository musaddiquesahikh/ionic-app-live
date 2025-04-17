import { Component } from '@angular/core';
import * as introJs from 'intro.js/intro.js';
import 'intro.js/introjs.css';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor() {}
  ngOnInit(){
  //   let t = JSON.parse(localStorage.getItem('manage_money'))
  //   if(t){
  //   setTimeout(() => {
  //     this.introMethod();
  //   }, 1000);
  // }
  }
  introMethod() {    
    let intro = introJs();
  
  intro.oncomplete(function() {
    console.log("On Complete");
      document.getElementById('money').click();
      localStorage.setItem('tabs', 'false');

  });
  intro.onexit(function (){
    localStorage.setItem('tabs', 'false');

  })
    intro.setOptions({
      steps: [
        {
          element: '#money',
          intro: 'Manage Your Money.',
        },
      ],
      showStepNumbers: false,
      showBullets: false,
      exitOnOverlayClick: true,
      exitOnEsc: true,
      scrollToElement:true,
      scrollTo:"element",
      scrollPadding:30,
      nextLabel: '<ion-button size="small">next</ion-button>',
      prevLabel: '<ion-button size="small">Back</ion-button>',
      doneLabel: '<ion-button size="small">Manage Money</ion-button>',
      // skipLabel: 'Exit',

    });

    intro.start();
    // localStorage.setItem('manage_money', 'true');

  }
}
