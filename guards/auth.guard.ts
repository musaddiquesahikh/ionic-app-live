import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/api.service';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public Role: any = {};
  data: any = {};
  op: boolean = false;
  constructor(private api: ApiService, private alertCtrl: AlertController, private translate: TranslateService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authRole(route)
  }

  authRole(route: any) {
    let user = JSON.parse(sessionStorage.getItem('loginData'));
    return this.api.role({
      "mobile_no": user.user[0].mobile, "company": this.api.getCompanyId()
    })
      .pipe(map((res: any) => {
        console.log("resp", res);
        console.log("res.data.pages", typeof (route.data.pages));

        // console.log(res.data.pages.includes(route.data.pages), typeof(route.data.pages), (route.data.pages), 'route.data.pagename', route.data.actions);

        if (res.status === 200) {
          if (res.data.role === 'admin') {
            return true
          }
          else if (res.data.role === 'partner') {
            console.log("route.data.pagename", route.data);
            console.log("route.data.actions", res.data.actions);
            if (res.data.pages.includes(route.data.pagename) && res.data.actions.includes(route.data.actions)) {
              console.log('partner');
              
            } else {
              this.showAlert();
              return false
            }
          }
          else if (res.data.role === 'salesman') {
            console.log("route.data.pagename", route.data);
            console.log("route.data.actions", res.data.actions);
            if (res.data.pages.includes(route.data.pagename) && res.data.actions.includes(route.data.actions)) {
              console.log('salesman');
              return true
            } else {
              this.showAlert();
              return false
            }
          }
          else if (res.data.role === 'accountant') {
            console.log('accountant');
            if (res.data.pages.includes(route.data.pagename) && res.data.actions.includes(route.data.actions)) {
              console.log('accountant');
              return true
            } else {
              this.showAlert();
              return false
            }
          }
          else {
            this.showAlert();
            console.log('role op', res);
            return false
          }
        }
      })
      )
  }
  async showAlert() {
    let alert = await this.alertCtrl.create({
      header: this.translate.instant('MESSAGE.UNAUTHORIZED'),
      message: this.translate.instant('MESSAGE.YOU ARE NOT AUTHORIZED TO VISIT THAT PAGE'),
      buttons: ['OK']
    });
    alert.present();
  }
}
