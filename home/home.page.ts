import { Component, ViewChild } from '@angular/core';
import { IonSlide, IonSlides, NavController,  } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'page-home',
  templateUrl: 'home.page.html',
  styleUrls: [ './home.page.scss' ]
})
export class HomePage {
  @ViewChild(IonSlides) slides: IonSlides;
	currentIndex = 0;
	totalSlide = 3;
	constructor(public navCtrl: NavController, public navParams: NavParams,private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id');

	}

  nextSlide() {
    this.currentIndex++;

    this.slides.slideNext();
  }

	prevSlide() {
		this.currentIndex--;
		this.slides.slidePrev();
	}

  slidesDidLoad() {
    // The IonSlides object has finished initializing
    this.slides.slideNext();
  }
  slideChanged() {
    const activeIndex = this.slides.getActiveIndex();
  }

	// finish() {
	// 	localStorage.setItem('isIntroDone', 'yes');
	// 	this.navCtrl.setRoot(HomePage);
	// }
}
function Slides(Slides: any) {
  throw new Error('Function not implemented.');
}