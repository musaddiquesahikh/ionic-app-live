import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import * as introJs from 'intro.js/intro.js';
import 'intro.js/introjs.css';
import { IonSearchbar } from '@ionic/angular';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.page.html',
  styleUrls: ['./tour.page.scss'],
})

export class TourPage implements OnInit {
  // @ViewChild('searchBar', { static: false }) searchBar: IonSearchbar;
  
  //  ionViewDidEnter() {
  //   this.searchBar.setFocus();
  // }
  
  searchTerm:string
  items:any [] = [
  {name1:'Where can we see the create invoice option?'},
  {name2:'How to create Ledger?'},
  {name3:'How to create PaymentIn?'},
  {name4:'where can we see the reports'},
  {name5:'Company Setting?'},
  {name6:'Where can we see the sales invoices and Edit Invoice?'},
  {name7:'Where can we manage money?'}
  ];
 
  constructor(public popoverController:PopoverController,private router: Router) { }

  ngOnInit() {
  }
  introMethod() {    
  let intro = introJs();
  intro.oncomplete(function() {
    console.log("On Complete");
      document.getElementById('step3').click();
      localStorage.setItem('dashboard', 'false');

  });
  intro.onexit(function (){
    localStorage.setItem('dashboard', 'false');
    
  })
    intro.setOptions({
      steps: [
        {
          element: '#step3',
          intro: 'Click Here To Create Invoice.',
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
      doneLabel: '<ion-button size="small">Create Invoice</ion-button >',

    });
    intro.start();
  }
  clickinvoice(){
    this.introMethod();
    localStorage.setItem('dashboard', 'true');
    localStorage.setItem('invoice', 'true');
    localStorage.setItem("inv_item" ,"true");
    localStorage.setItem("show_item" ,"true"); 
    localStorage.setItem("create_item" ,"true");
    localStorage.setItem("create_party" ,"true");
    localStorage.setItem("save" ,"true");
   }
   dissmiss(){
    this.searchTerm=null
    this.filterItems()
    this.popoverController.dismiss();
   }
   clickrepoets(){
    let intro = introJs();
    intro.oncomplete(function() {
      console.log("On Complete");
        document.getElementById('step13').click();
        localStorage.setItem('dashboard', 'false');
    });
   
      intro.setOptions({
        steps: [
          {
            element: '#step13',
            intro: 'Click Here To View Reports.',
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
        doneLabel: '<ion-button size="small">View Reports</ion-button >',
      });
  
      intro.start();
      localStorage.setItem('reports', 'true');
      localStorage.setItem('sales-register', 'true');
   }
   clickledger(){
    let intro = introJs();
    intro.oncomplete(function () {
      console.log("On COmplete");
      document.getElementById('ledger1').click()
      localStorage.setItem('dashboard', 'false');
    });
  
    intro.setOptions({
      steps: [
        {
          element: '#ledger1',
          intro: 'Click Here To Create new ledger.',
        },   
      ],
      
      // disableInteraction: false , 
      showStepNumbers: false,
      showBullets: false,
      exitOnOverlayClick: true,
      exitOnEsc:true,
      scrollToElement:true,
      scrollTo:"element",
      scrollPadding:30,
      nextLabel: '<ion-button size="small">next</ion-button>',
      prevLabel: '<ion-button size="small">Back</ion-button>',
      doneLabel: '<ion-button size="small">Create Ledger</ion-button>'
    }) 
    intro.start();
    localStorage.setItem('alter_ledger', 'true');
    localStorage.setItem('create_ledger', 'true');
    }
    clickpaymentIn(){
      let intro = introJs();
      intro.oncomplete(function () {
        console.log("On COmplete");
        document.getElementById('paymentin1').click()
        localStorage.setItem('dashboard', 'false');
      });
      intro.setOptions({
        steps: [
          {
            element: '#paymentin1',
            intro: 'CliCk Here To Create Payment IN',
          },
        ],
        
        disableInteraction: false ,
        showStepNumbers: false,
        showBullets: false,
        exitOnOverlayClick: true,
        exitOnEsc:true,
        scrollToElement:true,
        scrollTo:"element",
        scrollPadding:30,
        nextLabel: '<ion-button size="small">next</ion-button>',
        prevLabel: '<ion-button size="small">Back</ion-button>',
        doneLabel: '<ion-button size="small">PaymentIN</ion-button >'
      }) 
      intro.start();
      localStorage.setItem('payin', 'true');
      }
      clicksetting(){
        let intro = introJs();
        intro.oncomplete(function () {
          console.log("On COmplete");
          document.getElementById('setting1').click()
          localStorage.setItem('dashboard', 'false');
        });
      
        intro.setOptions({
          steps: [
            {
              element: '#setting1',
              intro: 'Click Here For Company Setting',
            }, 
          ],
          
          disableInteraction: false ,
          showStepNumbers: false,
          showBullets: false,
          exitOnOverlayClick: true,
          exitOnEsc:true,
          scrollToElement:true,
          scrollTo:"element",
          scrollPadding:30,
          nextLabel: '<ion-button size="small">next</ion-button>',
          doneLabel: '<ion-button size="small">Company Setting</ion-button >'
        }) 
        intro.start();
        localStorage.setItem('setting', 'true');
      }
  
      clickeditinvoice(){
        let intro = introJs();
        intro.oncomplete(function () {
          console.log("On COmplete");
          document.getElementById('editinv').click()
          localStorage.setItem('dashboard', 'false');
        });
      
        intro.setOptions({
          steps: [
            {
              element: '#editinv',
              intro: 'Click Here to view Createrd Invoices And Edit Invoice',
            }, 
          ],
          
          disableInteraction: false ,
          showStepNumbers: false,
          showBullets: false,
          exitOnOverlayClick: true,
          exitOnEsc:true,
          scrollToElement:true,
          scrollTo:"element",
          scrollPadding:30,
          nextLabel: '<ion-button size="small">next</ion-button>',
          doneLabel: '<ion-button size="small">Edit</ion-button>',
          
        }) 
        intro.start();
        localStorage.setItem('reports', 'true');
        localStorage.setItem('sales-register', 'true');
        localStorage.setItem('edit_invoice', 'true');
      }
      clickManageMony(){
        let intro = introJs();
    
        intro.oncomplete(function() {
          console.log("On Complete");
            document.getElementById('money').click();
            localStorage.setItem('tabs', 'false');
        });
          intro.setOptions({
            steps: [
              {
                element: '#money',
                intro: 'Click Here To Manage Your Money.',
                position: 'top'
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
            position: 'right'
          })
          intro.start();
          localStorage.setItem('manage_money', 'true');
      }
      filterItems() {
        if (this.searchTerm && this.searchTerm.trim() !== '') {
          this.items = this.items.filter((item) => {
            return (
              (item.name1 && item.name1.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
              (item.name2 && item.name2.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
              (item.name3 && item.name3.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
              (item.name4 && item.name4.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
              (item.name5 && item.name5.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
              (item.name6 && item.name6.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
              (item.name7 && item.name7.toLowerCase().includes(this.searchTerm.toLowerCase()))
          );
         });
        }else {
          this.items = [
            {name1:'Where can we see the create invoice option?'},
            {name2:'How to create Ledger?'},
            {name3:'How to create PaymentIn?'},
            {name4:'where can we see the reports'},
            {name5:'Company Setting?'},
            {name6:'Where can we see the sales invoices and Edit Invoice?'},
            {name7:'Where can we manage money?'}
         ];
        } 
      }
    }
