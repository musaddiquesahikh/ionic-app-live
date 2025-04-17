import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.page.html',
  styleUrls: ['./reactive.page.scss'],
})
export class ReactivePage implements OnInit {

  testForm:FormGroup;
  constructor(fb:FormBuilder) { 
    this.testForm=fb.group({
      'name':[null, Validators.required]
    })
    
  }

  ngOnInit() {
  }

}
