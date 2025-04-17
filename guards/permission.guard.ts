import { BooleanInput } from '@angular/cdk/coercion';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../api.service';
// import {  } from "module";

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {

  public Role: any = {};
  roles: any;
  data: any = {};
  op: boolean = false;
  constructor(private api: ApiService, private alertCtrl: AlertController, private translate: TranslateService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authRole(route)
  }

  authRole(route: any) {
    let user = JSON.parse(sessionStorage.getItem('loginData'));
    return this.api.role1({
      "mobile": user.user[0].mobile, "company_id": this.api.getCompanyId()
    })
      .pipe(map((res: any) => {
        console.log("assinged role", res);
        console.log("res.data.pages", (route.data.pagename));
        this.roles = res
        console.log("assinged role", this.roles);
        if (res.status == 200) {
          if (res.data.role) {
            for (let tt of res.data.permissions) {
              console.log("tt.page_name", tt.page_name, "route.data.pageName", route.data.pagename);

              if (tt.page_name == route.data.pagename) {
                console.log("permission", tt.actions);
                if (tt.actions.view) {
                  console.log(tt.actions.view);
                  
                  console.log("pppp", tt.actions);
                  console.log(res.data.role);
                  
                  return true
                }
                else {
                  this.showAlert();
                }
              }
            }
          } else {

            this.showAlert();

          }
        }
      }))
  }

  async showAlert() {
    let alert = await this.alertCtrl.create({
      header: this.translate.instant('MESSAGE.UNAUTHORIZED'),
      message:this.translate.instant('MESSAGE.YOU ARE NOT AUTHORIZED TO VISIT THAT PAGE'),
      buttons: ['OK']
    });
    alert.present();
  }
}
