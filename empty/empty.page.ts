import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.page.html',
  styleUrls: ['./empty.page.scss'],
})
export class EmptyPage implements OnInit {

  constructor(private router: Router, public navCtrl:NavController) { }

  ngOnInit() {
    this.navCtrl.navigateRoot('/tabs/tab1')
  }

}
