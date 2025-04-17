import { modalController } from '@ionic/core';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from "../api.service";
import { LoadingController, ModalController, Platform, PopoverController, ToastController } from "@ionic/angular";
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../language.service';
import * as introJs from 'intro.js/intro.js';
import 'intro.js/introjs.css';
// import { SmsRetriever } from '@ionic-native/sms-retriever/ngx';
declare var SmsRetriever : any
// import * as StepHARD from 'shepherd.js';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  [x: string]: any;
  @Output() passwordStrength = new EventEmitter<boolean>();
  showPassword: boolean = true;
  passwordIsValid = false;
  data: any = [];
  response: any = {};
  message: boolean;
  message_text: any = false;
  loginForm: FormGroup;
  otpForm: FormGroup;
  login: Boolean = true;
  otp: Boolean = false;
  createPassword: Boolean = false;
  otpNumber: Boolean = false;
  otpNumberRegister: Boolean = false;
  register: Boolean = false;
  otpButton: any = "Send OTP";
  newPasswordForm: FormGroup;
  registerForm: FormGroup;
  registration: Boolean;
  registrationForm: FormGroup;
  trigger_button1: boolean

  private key = CryptoJS.enc.Utf8.parse('Xp2s5v8y/B?E(H+M');
  private iv = CryptoJS.enc.Utf8.parse('Xp2s5v8y/B?E(H+M');
  msg: string;
  reactive: boolean;
  public loading: any;
  public isGoogleLogin = false;
  public user = null;
  languages: any = []
  selected: any = ''
  on_tour: boolean
  constructor(private api: ApiService, private modalController: ModalController,
    public toastController: ToastController,
    private translate: TranslateService,
    private router: Router,
    public formBuilder: FormBuilder, private popOverCtrl: PopoverController,
    private languageService: LanguageService,
    public loadingController: LoadingController,
    // private fireAuth: AngularFireAuth,
    private platform: Platform, ) {
// private smsRetriever: SmsRetriever
    this.loginForm = formBuilder.group({
      'email': ['', Validators.compose([Validators.required, Validators.pattern(/^(?:\d{10}|\w+@\w+\.\w{2,3}|^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+)$/)])],
      // 'mobile': ['', Validators.compose([Validators.required, Validators.pattern(/^(?:\d{10}|\w+@\w+\.\w{2,3})$/)])],
      'password': [null, Validators.required]
    })
    this.otpForm = formBuilder.group({
      'mobile_number': ["", Validators.compose([Validators.required, Validators.pattern(/^[6-9]{1}[0-9]{9}$/)])],
      'hashed': [""],
      'otp': [""]
    })
    this.newPasswordForm = formBuilder.group({
      'new_password': ['', Validators.compose([Validators.required, this.passwordStrengthValidator])],
      'confirm_password': ['', Validators.compose([Validators.required, this.passwordStrengthValidator])],
      'token': [null]
    })
    this.registerForm = formBuilder.group({
      "f_name": [null, Validators.required],
      "l_name": [null, Validators.required],
      'mobile_number': ["", Validators.compose([Validators.required, Validators.pattern(/^[6-9]{1}[0-9]{9}$/)])],
      'hashed': [""],
      'version_id': ['1.0.9'],
      'otp': [""]

    })
    this.registrationForm = formBuilder.group({
      "f_name": [null, Validators.required],
      "l_name": [null, Validators.required],
      "email": ['', Validators.compose([Validators.pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
      ])],
      "password": [null, Validators.required],
      "c_password": [null, Validators.required],
      "token_id": [],
      "mobile": [null, Validators.compose([Validators.required, Validators.pattern(/^[6-9]{1}[0-9]{9}$/)])],
      "isPasswordUpdate": ["yes"],
    })

  }

  async ngOnInit() {
    this.on_tour = this.api.intro_tour
    // setTimeout(() => {
    //   if(this.on_tour){
    //     this.introMethod();
    //   }
    // }, 4000);
    this.languages = this.languageService.getLanguage()
    this.selected = this.languageService.selected
    this.registrationForm.patchValue({
      'mobile': localStorage.getItem("mobile"),
      "token_id": localStorage.getItem("token_id")
    })
    this.login = true
    this.checkLogin();

    let data = { username: "9167210211", password: "12345" }

    this.encryptUsingAES256(JSON.stringify(data))
    this.loading = await this.loadingController.create({
      message: 'Connecting ...'
    });

    this.smsRetriever.getAppHash()
      .then((res: any) => {
        console.log(res);
        this.otpForm.get('hashed').patchValue(res);
        this.registerForm.get('hashed').patchValue(res);
      })
      .catch((error: any) => console.error(error));

  }
  isPasswordStrong(): boolean {
    const control = this.newPasswordForm.get('new_password');
    return control && !control.errors?.weakPassword;
  }

  passwordStrengthValidator(control) {
    const value = control.value || '';
    let strength = 0;

    // Strength rules
    if (value.length >= 8) strength += 1;
    if (/[A-Z]/.test(value)) strength += 1;
    if (/[a-z]/.test(value)) strength += 1;
    if (/\d/.test(value)) strength += 1;
    if (/[@$!%*?&#]/.test(value)) strength += 1;

    return strength >= 4 ? null : { weakPassword: true }; // Adjust based on your criteria
  }
  startSmsRetriever() {
    console.log('sms fired1,');
    SmsRetriever.startWatching()
      .then((res: any) => {
        // OTP code will be available in res.Message
        console.log(res.Message, 'autosms');
        let otp = res.Message.substring(4, 10);
        this.otpForm.get('otp').patchValue(otp);
        this.registerForm.get('otp').patchValue(otp);
      })
      .catch((error: any) => console.error(error));
  }

  // startSmsRetriever() {
  //   console.log('sms fired');
  //   const SmsRetriever=cordova.plugins.SmsRetriever
  //   try {
  //     this.smsRetriever.startWatching()
  //       .then((res: any) => {
  //         // Check if res.Message is available
  //         console.log(res,'loggg');
          
  //         if (res.Message) {
  //           console.log(res.Message, 'autosms');
  //           let otp = res.Message.substring(4, 10); // Adjust based on actual OTP position
  //           this.otpForm.get('otp').patchValue(otp);
  //           this.registerForm.get('otp').patchValue(otp);
  //         } else {
  //           console.error('No message received');
  //         }
  //       })
  //       .catch((error: any) => console.error('Error in SMS Retriever:', error));
  //   } catch (err) {
  //     console.error('Unexpected error:', err);
  //   }
  // }

  modal1() {
    this.trigger_button1 = true
  }
  doLogin() {
    let params: any;
    if (this.platform.is('cordova')) {
      if (this.platform.is('android')) {
        params = {
          webClientId: '249105599-25csc03i25bld99cigilop20dspan23m.apps.googleusercontent.com', //  webclientID 'string'
          offline: true
        };
      } else {
        params = {};
      }
      this.google.login(params)
        .then((response) => {
          const { idToken, accessToken } = response;
          this.onLoginSuccess(idToken, accessToken);
        }).catch((error) => {
          alert('error:' + JSON.stringify(error));
        });
    } else {
      // this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(success => {
      //   this.isGoogleLogin = true;
      //   this.user =  success.user;
      // }).catch(err => {
      // });
    }
  }
  // onLoginSuccess(accessToken, accessSecret) {
  //   const credential = accessSecret ? firebase.auth.GoogleAuthProvider
  //       .credential(accessToken, accessSecret) : firebase.auth.GoogleAuthProvider
  //           .credential(accessToken);
  //   this.fireAuth.signInWithCredential(credential)
  //     .then((success) => {
  //       alert('successfully');
  //       this.isGoogleLogin = true;
  //       this.user =  success.user;
  //       this.loading.dismiss();
  //     });

  // }
  introMethod() {

    let intro = introJs();
    intro.oncomplete(function () {
      document.getElementById('step5').click()

    });
    intro.setOptions({
      enableInteraction() {
        introJs()._options.disableInteraction = true;
      },
      steps: [
        {
          element: document.querySelector('#step1'),
          intro: 'If you are a new user, click here to register.',
        },
        {
          element: '#step2',
          intro: 'Enter your username.',

        },
        {
          element: '#step3',
          intro: 'Enter your password.',

        },
        {
          element: '#step4',
          intro: 'If you do not remember your password, click here.',

        },
        {
          element: '#step5',
          intro: 'Click to submit.',

        },
      ],
      disableInteraction: true, // enable user interaction
      showStepNumbers: false,
      showBullets: false,
      exitOnOverlayClick: true,
      exitOnEsc: true,
      nextLabel: '<span style="color:green">Next</span>',
      prevLabel: '<span style="color:red">Previous</span>',
      doneLabel: 'Submit'
    }).start();

  }
  introMethod1() {

    let intro = introJs();
    intro.setOptions({

      steps: [

        {
          element: '#mobile',
          intro: 'Enter your mobile number.',

        },

        {
          element: '#signup',
          intro: 'click here to send otp.',

        },
      ],
      disableInteraction: true, // enable user interaction
      showStepNumbers: false,
      showBullets: false,
      exitOnOverlayClick: true,
      exitOnEsc: true,
      nextLabel: '<span style="color:green">Next</span>',
      prevLabel: '<span style="color:red">Previous</span>',
      doneLabel: 'Done'
    }).start();

  }
  introMethod2() {

    let intro = introJs();

    intro.setOptions({

      steps: [

        {
          element: '#otp',
          intro: 'Enter your OTP here.',

        },

        {
          element: '#verify',
          intro: 'Verify and proceed now.',

        },
      ],
      disableInteraction: true, // enable user interaction
      showStepNumbers: false,
      showBullets: false,
      exitOnOverlayClick: true,
      exitOnEsc: true,
      nextLabel: '<span style="color:green">Next</span>',
      prevLabel: '<span style="color:red">Previous</span>',
      doneLabel: 'Submit'
    }).start();

  }

  onLoginError(err) {
  }

  logout() {
    this.fireAuth.signOut().then(() => {
      this.isGoogleLogin = false;
    });
  }
  signInWithGoogle() {
    this.googlePlus.login({})
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }
  encryptUsingAES256(plaintext: any) {
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(JSON.stringify(plaintext)), this.key, {
      keySize: 128 / 8,
      iv: this.iv,
      mode: CryptoJS.mode.CBC
    });
    return encrypted;
  }
  dhasuLoginCheck() {
    console.log(sessionStorage, localStorage, "whats in session");
    // console.log(JSON.parse(sessionStorage.getItem("loginData")).token,"this is token",JSON.parse(localStorage.getItem("loginData")).token);

    console.log("checking starts for token validation");
    let tokenwa = sessionStorage.getItem("loginData");
    console.log(tokenwa, "check on blank");


    if (tokenwa != null) {
      let data = { token: JSON.parse(sessionStorage.getItem("loginData")).token }
      this.api.token_check(data).subscribe((res: any) => {
        if (res.status == 'success') {
          console.log("Sessiontoken is valid");
          setTimeout(() => {
            this.router.navigate(['/show-company-list']);
            console.log("timeout called");
          }, 1000);
          //this.router.navigate(['/show-company-list']);
          console.log("redirection failed");

        } else {
          console.log("session token is invalid");
          let r = { refresh: JSON.parse(sessionStorage.getItem("loginData")).refresh }
          // start working on refresh token
          this.api.getTokenByRefresh(r).subscribe((res: any) => {
            console.log("got response token", res);
            let s_data = JSON.parse(sessionStorage.getItem("loginData"));
            s_data.token = res.access;
            let final_d = JSON.stringify(s_data.token);
            sessionStorage.setItem("loginData", final_d);
            //now ready to go to app
          })
        }
        console.log("checking ends for token validation");
      })
    } else {
      console.log("session is null");

      let data = { token: JSON.parse(localStorage.getItem("loginData")).token }
      this.api.token_check(data).subscribe((res: any) => {
        if (res.status == 'success') {
          console.log("token is valid");
          sessionStorage.setItem("loginData", localStorage.getItem("loginData"))
          setTimeout(() => {
            this.router.navigate(['/show-company-list']);
            console.log("timeout called");
          }, 1000);


        } else {
          console.log("token is invalid");
          let r = { refresh: JSON.parse(localStorage.getItem("loginData")).refresh }

          // start working on refresh token
          this.api.getTokenByRefresh(r).subscribe((res: any) => {
            console.log("got response token", res);
            let s_data = JSON.parse(localStorage.getItem("loginData"));
            s_data.token = res.access;
            let final_d = JSON.stringify(s_data.token);
            sessionStorage.setItem("loginData", final_d);
            // this.router.navigate(['/show-company-list']);
            setTimeout(() => {
              this.router.navigate(['/show-company-list']);
              console.log("timeout called");
            }, 1000);

            //now ready to go to app
          })
        }
        console.log("checking ends for token validation");
      })
    }

  }


  checkLogin() {
    if (sessionStorage != null) {
      if (sessionStorage["loginData"] == null) {
        console.log("Please Login");

      } else {
        let loginData = JSON.parse(sessionStorage.getItem("loginData"));
        let token = loginData["token_id"];
        if (token != null) {
          this.router.navigate(['/show-company-list'])
        }
      }
    }

    this.dhasuLoginCheck();
  }

  public OnlyNumbers($event) {
    let regex: RegExp = new RegExp(/^[0-9]{1,}$/g);
    let specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowRight', 'ArrowLeft'];
    if (specialKeys.indexOf($event.key) !== -1) {
      return;
    } else {
      if (regex.test($event.key)) {
        return true;
      } else {
        return false;
      }
    }
  }

  submitForm1() {
    this.api.showLoading();
    if (this.loginForm.valid) {

      this.api.login(this.loginForm.value).subscribe((response: any) => {
        if (response.status == 'failed') {
          this.reactive = false;
          this.message = true;

          this.presentToast(response.message)
          if (!response.message) {
            this.msg = response.data
            this.reactive = false
            this.presentToast(this.msg)

          }
          if (response.data == "Account not active") {
            this.reactive = true

          }
          if (response.data.status == 401) {
            this.msg = response.data.data
            this.presentToast(this.msg)
            this.reactive = false
          }

        } else if (response.status == 'success') {
          sessionStorage.setItem('loginData', JSON.stringify(response));
          localStorage.setItem('loginData', JSON.stringify(response));
          this.router.navigate(['/show-company-list']);
        }
      })
    }
  }
  showOtp() {
    this.otpForm.get('mobile_number').reset();
    this.otpForm.get('otp').reset();
    this.otp = true;
    this.login = false;
  }
  submitForm2() {
    this.startTimer();
    this.startResendTimer();
    if (this.otpForm.valid) {

      localStorage.setItem("mobile", this.otpForm.value.mobile_number)
      this.api.forgotPassword(this.otpForm.value).subscribe((response: any) => {

        if (response.status == "1") {
          this.otpNumber = true
          this.presentToast1(response.message)
          this.startSmsRetriever();
        }
        if (response.status == "0") {
          this.presentToast1(response.message)
          this.otp = false
          this.register = true
        }
      })
    }
  }
  submitForm3() {
    this.createPassword = true
    this.otp = false
  }
  async submitFormVerify() {
    if (this.registerForm.value['otp'] !== null) {
      if (this.registerForm.valid) {
        this.api.verifyPassword(this.registerForm.value).subscribe((response: any) => {
          console.log(response,'pppp');
          
          if (response.status == "1") {
            this.registrationForm.value.f_name;
            this.registrationForm.value.l_name;
            this.registrationForm.value.mobile;
            this.registrationForm.value.email;
            this.registrationForm.value.password;
            this.registrationForm.value.c_password;
            this.registrationForm.get('f_name').patchValue(this.registerForm.value.f_name);
            this.registrationForm.get('l_name').patchValue(this.registerForm.value.l_name);
            this.registrationForm.get('mobile').patchValue(this.registerForm.value.mobile_number);
            this.registrationForm.get('email').patchValue('');
            let pass = this.generatePassword(10);
            this.registrationForm.get('password').patchValue(pass);
            this.registrationForm.get('c_password').patchValue(pass);
            localStorage.setItem("token_id", response.token)
            this.registerSubmit();
          }
          if (response.status == "0") {
            this.presentToast(response.message)
          }
        })
      }
      else {
        const toast = await this.toastController.create({
          message: "Please Enter OTP",
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      }
    }
    else {
      const toast = await this.toastController.create({
        message: "Please Enter OTP",
        duration: 2000,
        position: 'middle'
      });
      toast.present();
    }
  }
  async submitFormVerify1() {
    if (this.otpForm.value['otp'] !== null) {
      if (this.otpForm.valid) {
        this.api.verifyPassword(this.otpForm.value).subscribe((response: any) => {
          if (response.status == "1") {
            this.otp = false,
              this.createPassword = true
            this.presentToast1(response.message)
            localStorage.setItem("token_id", response.token)
          } else {
            this.presentToast(response.message)
          }
        })
      }
      else {
        const toast = await this.toastController.create({
          message: "Please Enter OTP",
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      }
    }
    else {
      const toast = await this.toastController.create({
        message: "Please Enter OTP",
        duration: 2000,
        position: 'middle'
      });
      toast.present();
    }
  }

  savePassword() {
    let token_id = localStorage.getItem("token_id");
    if (this.newPasswordForm.valid) {
      this.newPasswordForm.patchValue({
        'token': token_id
      })
      if (this.newPasswordForm.value.new_password == this.newPasswordForm.value.confirm_password) {
        let newData = { username: localStorage.getItem("mobile"), password: this.newPasswordForm.value.new_password }
        this.api.forgot_password(this.newPasswordForm.value).subscribe((response: any) => {
          if (response.status == "1") {
            // this.newPasswordForm.value.new_password
            let enscrypted = this.encryptUsingAES256(JSON.stringify(newData))
            let data = { data: enscrypted.ciphertext.toString(CryptoJS.enc.Base64) }
            // this.api.forgot_password(data).subscribe((response: any) => {
            // })
            this.presentToast1(response.message)
            this.login = true
            this.createPassword = false
            //localStorage.setItem("token_id",response.token_id)
          }
          else {
            this.presentToast(response.message)
          }
        })
      }
      else {
        this.presentToast("password does not match")
      }
    }
  }
  signup() {
    // this.mobile_number?.reset();
    this.registerForm.get('mobile_number').reset();
    this.registerForm.get('otp').reset();
    this.login = false
    this.register = true;
    this.otpNumber = false;
    this.otp = false;
    this.otpNumberRegister = false
    // setTimeout(() => {
    //   this.introMethod1();
    // }, 2000);
  }
  backLogin() {
    this.login = true
    this.otp = false
    this.otpNumber = false;
    this.otpNumberRegister = false
  }
  backLogin1() {
    this.login = true
    this.register = false
    this.otpNumberRegister = false
  }
  onClickLogin() {
    this.registration = false
    this.login = true
    this.register = false
    this.otpNumberRegister = false
    this.otpNumber = false;

  }
  sendRegisterOtp() {
    this.startTimer();
    this.startResendTimer();
    if (this.registerForm.valid) {

      localStorage.setItem("mobile", this.registerForm.value.mobile_number)
      this.api.sendOtp(this.registerForm.value).subscribe((response: any) => {
        this.presentToast(response.message)
        if (response.status == "1") {
          this.presentToast1(response.message)
          this.otpNumberRegister = true
          // this.login=true
          //this.createPassword=false
          //localStorage.setItem("token_id",response.token_id)
          setTimeout(() => {
            this.startSmsRetriever();
          }, 1000);
        } else {
          this.presentToast1(this.translate.instant('MESSAGE.YOU ARE ALREADY REGISTERED'))
          this.login = true
          this.register = false;
        }
        //   {
        //     "status": "1",
        //     "message": "Otp has been sent to your registered mobile"
        // }
      },
        error => {
          this.presentToast1(this.translate.instant('MESSAGE.YOU ARE ALREADY REGISTERED'))
          this.login = true
          this.register = false;
        },
        () => {
          // 'onCompleted' callback.
          // No errors, route to new page here
        })
    }
  }
  startResendTimer() {
    this.showResendBtn = false; // Hide the resend button
    this.remainingTime = 60;
    const intervalId = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime === 0) {
        clearInterval(intervalId);
        this.showResendBtn = true; // Show the resend button
      }
    }, 1000);
  }
  startTimer() {
    let intervalId = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        clearInterval(intervalId);
        this.showResendBtn = true;
      }
    }, 1000);
  }
  submitRegisterVerify() {
    // this.createPassword=true
    //this.otp=
    //this.register
    // let token_id=localStorage.getItem("token_id");

    if (this.registerForm.valid) {
      this.api.verifyPassword(this.registerForm.value).subscribe((response: any) => {
        if (response.status == "1") {
          this.presentToast1(response.message)
          localStorage.setItem("token_id", response.token)
          this.register = false
          this.registration = true;
        } else {
          this.presentToast(response.message)
        }

        //   {
        //     "status": "1",
        //     "token_id": "TmRZZ2RRdzdaNGs3Tmg2bzdjYnFEd2lIOEFiMUpPTjdzYzBjTHJ1Wg==",
        //     "message": "Otp verified successfully!!"
        // }

      })


    }

  }

  async registerSubmit() {
    console.log(this.registrationForm.value);


    this.registrationForm.patchValue({
      'mobile': localStorage.getItem("mobile"),
      "token_id": localStorage.getItem("token_id")
    })
    let r = this.registrationForm.value
    if (r.f_name && r.l_name && r.password && r.c_password) {

      if (this.registrationForm.value.password == this.registrationForm.value.c_password) {
        this.api.showLoading1();
        this.api.registersubmit(this.registrationForm.value).subscribe((response: any) => {
          if (response.status == "1") {
            this.presentToast1(response.message)
            response.mobile = null
            let data = {
              "first_name": this.registrationForm.value.f_name,
              "last_name": this.registrationForm.value.l_name,
              "username": this.registrationForm.value.mobile,
              "email": this.registrationForm.value.email,
              "password": this.registrationForm.value.password,
              "c_password": this.registrationForm.value.c_password,
            }
            this.api.registersubmit1(data).subscribe((response: any) => {
              console.log(response, "ragister submit");
              if (response.status == 200) {
                data.email = data.username;
                this.api.login(data).subscribe((response: any) => {
                  if (response.status == 'failed') {
                    this.reactive = false;
                    this.message = true;

                    this.presentToast(response.message)
                    if (!response.message) {
                      this.msg = response.data
                      this.reactive = false
                      this.presentToast(this.msg)

                    }
                    if (response.data == "Account not active") {
                      this.reactive = true
                    }
                    if (response.data.status == 401) {
                      this.msg = response.data.data
                      this.presentToast(this.msg)
                      this.reactive = false
                    }
                  } else if (response.status == 'success') {
                    sessionStorage.setItem('loginData', JSON.stringify(response));

                    this.router.navigate(['/show-company-list']);
                  }
                })
              } else {
                this.presentToast(response.message)
                // this.router.navigate(['/show-company-list']);
              }
            })
          }
        })
      }
      else {
        const toast = await this.toastController.create({
          message: this.translate.instant('MESSAGE.PASSWORD NOT MATCHING'),
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      }
    }
    else {
      if (!r.f_name) {
        this.presentToast("First Name Required")
      }
      else if (!r.l_name) {
        this.presentToast("Last Name Required")
      } else if (!r.password) {
        this.presentToast("password Required")
      }
      else {
        this.presentToast("Confirmed password Required")

      }
    }
  }

  async presentToast(message: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'middle',
      // buttons: [
      //   {
      //     text: 'OK',
      //     cssClass: "toast-scheme",
      //     role: 'cancel',
      //     handler: () => {
      //     }
      //   }
      // ]
    });
    toast.present();
  }
  async presentToast1(message: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'middle',
      // buttons: [
      //   {
      //     text: 'OK',
      //     cssClass: "toast-scheme",
      //     role: 'cancel',
      //     handler: () => {
      //     }
      //   }
      // ]
    });
    toast.present();
  }


  submitdata() {


    // let data = JSON.stringify(this.user)
    this.api.login(this.user).subscribe((response: any) => {
      if (response.status == 'failed') {
        this.message = true;
        this.message_text = response.message;
      } else if (response.status == 'success') {
        sessionStorage.setItem('loginData', JSON.stringify(response));
        this.router.navigate(['/show-company-list']).then(() => {
          window.location.reload();
        });
      }
    });
  }
  //  // this.api.post(this.user.username, this.user.password)
  //     .subscribe((response: any[]) => {
  //       alert(response);
  //       sessionStorage.setItem('loginData',JSON.stringify(response));

  //       this.router.navigate(['/tabs/tab1'])
  //     }, (error) => {
  //       if (error.status == 401) {


  cpassword() {
    if (this.registrationForm.value.password != this.registrationForm.value.c_password) {
      this.msg = this.translate.instant('MESSAGE.PASSWORD NOT MATCHING')
    } else {
      this.msg = this.translate.instant('MESSAGE.PASSWORD MATCHED')
    }
  }

  passwordValid(event) {
    this.passwordIsValid = event;
  }
  async reactiveAccount() {
    const toast = await this.toastController.create({
      header: this.translate.instant('MESSAGE.ARE YOU SURE YOU WANT TO REACTIVE THIS ACCOUNT ?'),
      position: 'middle',
      buttons: [
        {
          text: this.translate.instant('HEADER.YES'),
          role: "done",
          handler: async () => {
            this.api.reactiveAccount(this.loginForm.value.email).subscribe(async (response: any) => {

              if (response.status == 200) {
                const toast = await this.toastController.create({
                  message: this.translate.instant('MESSAGE.ACCOUNT SUCCESSFULLY ACTIVATED'),
                  duration: 2000,
                  position: 'middle'
                });
                toast.present();
              }
            })
            this.reactive = false
          },
        },
        {
          text: this.translate.instant('HEADER.CANCEL'),
          role: "cancel",
          handler: async () => {
          }
        },
      ],
    });
    toast.present();

  }
  togglePassword(input: any) {
    this.showPassword = !this.showPassword
    input.type = input.type === 'password' ? 'text' : 'password';

  }
  select(lng) {
    this.languageService.setLanguage(lng)
    // this.modalController.dismiss()
    this.trigger_button1 = true
  }
  back() {
    this.modalCtrl.dismiss(this.x)
  }
  openContactPage() {

  }
  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  generatePassword(passwordLength) {
    var numberChars = "0123456789";
    var upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var lowerChars = "abcdefghijklmnopqrstuvwxyz";
    var allChars = numberChars + upperChars + lowerChars;
    var randPasswordArray = Array(passwordLength);
    randPasswordArray[0] = numberChars;
    randPasswordArray[1] = upperChars;
    randPasswordArray[2] = lowerChars;
    randPasswordArray = randPasswordArray.fill(allChars, 3);
    return this.shuffleArray(randPasswordArray.map(function (x) { return x[Math.floor(Math.random() * x.length)] })).join('');
  }



  // generatePassword(){

  //   var generatePassword = (
  //     length = 20,
  //     characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$'
  //   ) =>
  //     Array.from(crypto.getRandomValues(new Uint32Array(length)))
  //       .map((x) => characters[x % characters.length])
  //       .join('')

  //   //console.log(generatePassword())
  // }

  OTP: string = '';

  otpController(event, next, prev, index) {

    if (index == 6) {
      console.log("submit")
    }
    if (event.target.value.length < 1 && prev) {
      prev.setFocus()
    }
    else if (next && event.target.value.length > 0) {
      next.setFocus();
    }
    else {
      return 0;
    }
  }

}

