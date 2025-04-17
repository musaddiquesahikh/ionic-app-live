import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-wise-proforma',
  templateUrl: './item-wise-proforma.page.html',
  styleUrls: ['./item-wise-proforma.page.scss'],
})
export class ItemWiseProformaPage implements OnInit {
  isItemAvailable: Boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
