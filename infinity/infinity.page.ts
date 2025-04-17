import { Component, OnInit ,ViewChild} from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-infinity',
  templateUrl: './infinity.page.html',
  styleUrls: ['./infinity.page.scss'],
})
export class InfinityPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(public api:ApiService) { }

  currentPage:number=1
  users:any=[]
  data:any=[]
item:any={}
  total:number=0

  ngOnInit() {
    // this.getData();
  }

  getData(){
    this.item.company_id = this.api.getCompanyId()
    let header = this.api.getHeader();
    this.item.limit = 3
    this.item.page_number = this.currentPage
    this.api.fakeData1(this.item,header).subscribe((response:any)=>{
      console.log(response);
      this.data=response.data
      for(let n of this.data){
          this.users.push(n)
      }
      this.total=response.total
      
    })

  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.currentPage++

   setTimeout(() => {
      // for (let i = 0; i < this.data.length; i++) {
      //   this.users.push( this.data[i] );
      // }
      
     
      this.getData()

      console.log('Async operation has ended');
      //infiniteScroll();
      infiniteScroll.target.complete();
      //console.log(infiniteScroll);
      
    }, 500);
  }

}
