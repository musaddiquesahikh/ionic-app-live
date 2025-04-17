import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.page.html',
  styleUrls: ['./edit-staff.page.scss'],
})
export class EditStaffPage implements OnInit {

  list: any = [];
  itemIn: any = [];
  company: any = []
  @Input() staffList;
  @Output() parentFunction: EventEmitter<any> = new EventEmitter();
  rolesData: any;

  constructor(public modelhh: ModalController, public router: Router, public api: ApiService,
    public modalCtrl: ModalController, public toastController: ToastController, private translate: TranslateService) {

    }

  ngOnInit() {
    console.log("receivedData", this.staffList);
    this.getRoles()
    
  }

  editItem() {
    console.log("editedData", this.staffList);
    this.parentFunction.emit(this.staffList);
    //this.modelhh = false;
    this.router.navigate(['/show-staff-list']);
    console.log("model is ->", this.modelhh)
    this.modelhh.dismiss();

  }
  editStaffData() {
    let changeData = this.rolesData.find((element) => element['id'] == this.staffList.role_id);
    this.staffList.role_id=changeData.id
    this.staffList.role=changeData.role
    this.company = JSON.parse(sessionStorage.getItem("currentCompany"));
    let companyId = this.company[0].id;
    console.log("party details", companyId);
    this.staffList.id = this.staffList.id
    this.staffList.company = companyId;
    let header = this.api.getHeader();


    this.api.editStaff(this.staffList, header).subscribe(async (response: any) => {
      console.log(response);
      let a = response.status
      if (a == 200) {
        // alert('Staff Updated Successfully')
        const toast = await this.toastController.create({
          message: this.translate.instant('MESSAGE.STAFF UPDATED SUCCESSFULLY'),
          duration: 2000,
          position: 'middle'
        });
        toast.present();
        this.list = response.data
        this.modalCtrl.dismiss(response.data);

        // this.router.navigate(['/show-staff-list'])
      }
    });
  }
  back() {
    this.modalCtrl.dismiss(this.list)
  }
  getRoles() {
    let option = this.api.getHeader()
    this.api.getRole({ company_id: this.api.getCompanyId() }, option).subscribe((response: any) => {
      console.log(response, 'role response');
      this.rolesData = response.data
      const indexOfObject = this.rolesData.findIndex((object: { id: any; }) => {
        return object.id === 7;
      });
      this.rolesData.splice(indexOfObject, 1);
      this.staffList.role_id=String(this.staffList.role_id)
      console.log(this.staffList.role_id);      
     })
    }
  }

