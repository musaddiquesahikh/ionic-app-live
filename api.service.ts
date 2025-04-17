import { InvoiceSettingPage } from './invoice-setting/invoice-setting.page';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { LoadingController } from '@ionic/angular';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'any' })

export class ApiService {
  session: any = {};
  public mainURL = "https://api.esarwa.com/api/";
  public subscription = "https://api.esarwa.com/subscription/"
  public esarwa_url = "https://esarwa.com/for_api/Esarwa_Api/public/";
  // public attendance_url = "https://api.esarwa.com/attendance/";
  app_version: any;

  razor_key = 'rzp_test_5SISB7RZ3kuwbG';//live new
  public baseUrl = "https://esarwa.com/for_api/Esarwa_Api/public/";
  public einvoiceURL = "https://api.esarwa.com/einvoicing/";
  intro_tour: boolean=true;
  public hsn_URL="https://services.esarwa.com/";
  create_company:boolean=true;
  manage_money:boolean=true;
  reports:boolean=true;
  create_ledger:boolean=true;
  log_inp:boolean=true;
  company_list:boolean=true;
  sales_invoice:boolean=true;
  constructor(public http: HttpClient, public loadingCtrl: LoadingController) { }

  public async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Authenticating',
      duration: 2000,
      spinner: "lines-sharp-small"
    });

    loading.present();
  }
  public async showLoading1() {
    const loading = await this.loadingCtrl.create({
      message: 'Registration Successfull, Getting Into App...',
      duration: 4000,
      spinner: "circles"
    });
    loading.present();
  }
  public HsnData(data:any) {
    let options=this.getHeader()
    return this.http.get(this.hsn_URL + 'search/?q=' + data,options);   
  }
  public login(myString: any): Observable<any> {
    return this.http.post(this.mainURL + 'login/', myString)
  }
  public forgot_password(plaintext: any): Observable<any> {
    return this.http.post(this.mainURL + 'forgot_password/', plaintext).pipe(
      catchError(this.handleError)
    )
  }

  public getHeader() {
    this.session = sessionStorage.getItem('loginData');
    let rowsession = JSON.parse(this.session);
    if (this.session != null) {
      let header = new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + rowsession['token']
      })
      let options = { headers: header };
      return options
    }
  }

  public submitPayment(data: any): Observable<any> {
    let options = this.getHeader();
    return this.http.post(this.mainURL + 'create_paytm_ac/', data, options)

  }

  public getLedgerData(company: any, header: any): Observable<any> {
    let body = company.id
    return this.http.post(this.mainURL + 'get_ledger_data/' + body + '/', company, header)
  }
  public submitInvoicetemplate(theme_id: any) {
    let options = this.getHeader();
    let id = this.getCompanyId();
    let data = { theme: theme_id }
    return this.http.post(this.mainURL + 'selectedtheme/' + id, data, options)
  }
  public getCompanyData(id: any): Observable<any> {
    let options = this.getHeader();
    return this.http.post(this.mainURL + 'company/', { id: id }, options)
  }
  public collectPaymentPos(data: any): Observable<any> {
    return this.http.get("https://payment.esarwa.com/pos/" + data + "/")
  }
  public getPaymentStatus(data: any, id: any): Observable<any> {
    return this.http.get("https://payment.esarwa.com/pos_status/" + data + "/" + id + "/")
  }

  public post(myString: any): Observable<any> {
    return this.http.post('https://api.esarwa.com/api/login/', myString);
  }


  public createNewCompany(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'create_company/', company, header)
  }

  public getCompany(header: any) {
    let user_number = sessionStorage.getItem('loginData');
    this.session = sessionStorage.getItem('loginData');
    let rawSession = JSON.parse(this.session)
    return this.http.post(this.mainURL + 'create_company/' + rawSession['mobile'], header)
  }

  public companyList(): Observable<any> {

    this.session = JSON.parse(sessionStorage.getItem("loginData"));
    let options = this.getHeader();

    let rawSession = JSON.parse(this.session);
    return this.http.post(this.mainURL + 'selectbusiness/' + rawSession.user[0].mobile, null, options)
  }
  public selectedCompanyList(id: any, header: any): Observable<any> {
    let body = { id: id };
    return this.http.post(this.mainURL + 'company/', body, header)
  }
  public createNewParty(party: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'party/', party, header).pipe(
      catchError(this.handleError))
  }
  public getGst(a:any,header){
    header=this.getHeader()
    return this.http.get(this.mainURL + 'fetch_userdetails_from_gstin/'+a,header).pipe(
      catchError(this.handleError)
    )
  }
  
  // public selectedPartyList(id: any, header: any): Observable<any> {
  //   let body = { "company_id": id };
  //   return this.http.post(this.mainURL + 'getparty/', body, header)
  // }
  public selectedPartyList(value, data) {
    return this.http.post(this.mainURL + 'search_parties_pag/s=' + value, data).pipe(
      catchError(this.handleError)
    )
  }

  public editParty(data: any, header: any): Observable<any> {
    return this.http.put(this.mainURL + 'party_edit/', data, header).pipe(
      catchError(this.handleError))

  }
  public getCode(id: any,header): Observable<any> {
    header= this.getHeader();
    return this.http.get(this.mainURL + 'get_unique_customer_code/' + id + '/',header)
  }
  public createNewItem(item: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'item/', item, header).pipe(
      catchError(this.handleError)
    )
  }
  getItemCode(c_id,header){
      header= this.getHeader();
    return this.http.get(this.mainURL+'get_unique_item_code/'+c_id+'/',header);
    
  }
  // public selectedItemList(id: any, header: any): Observable<any> {
  //   return this.http.post(this.mainURL + 'getitem/', id, header)
  // }
  public get_fy_by_date(date:any,header){
    let i={company_id:this.getCompanyId(),date:date};
     header= this.getHeader();
    return this.http.post(this.mainURL+'get_fy_by_date/',i,header).pipe(
      catchError(this.handleError))
  }
  
  public selectedItemList(value, data) {
    let option = this.getHeader();
    return this.http.post(this.mainURL + 'search_items_pag/s=' + value, data,option).pipe(
      catchError(this.handleError)
    )
  }
  
  public getSelectedItem(id: any, header: any): Observable<any> {
    header = this.getHeader();
    let body = { item: id };
    return this.http.post(this.mainURL + 'particularitem/', body, header)
  }

  public editItem(data: any, header: any): Observable<any> {
    header= this.getHeader();
    return this.http.put(this.mainURL + 'edit_item/', data, header).pipe(
      catchError(this.handleError)
    )
  }
  public createNewBank(item: any, header: any): Observable<any> {
    header= this.getHeader();
    return this.http.post(this.mainURL + 'bank/', item, header)
  }
  public bankList(id: any, header: any): Observable<any> {
    let body = { "company_id": id };
    header= this.getHeader();
    return this.http.post(this.mainURL + 'getbank/', body, header)
  }
  public getSelectedBank(id: any, header: any): Observable<any> {
    header= this.getHeader();
    return this.http.post(this.mainURL + 'getbankd/', id, header)
  }
  public editBank(data: any, header: any): Observable<any> {
    header= this.getHeader();
    return this.http.put(this.mainURL + 'edit_bank/', data, header)
  }

  public createNewSatff(item: any, header: any): Observable<any> {
    header= this.getHeader();
    return this.http.post(this.mainURL + 'staff/', item, header)
  }
  public createNewSatffOTP(item: any, header: any): Observable<any> {
    header= this.getHeader();
    return this.http.post(this.mainURL + 'enter_otp/', item, header)
  }

  public staffList(id: any, header: any): Observable<any> {
    header= this.getHeader();
    return this.http.post(this.mainURL + 'getstaff/' + id, null, header)
  }
  public createStaffPermission(payload: any, header: any): Observable<any> {
    header= this.getHeader();
    return this.http.post(this.mainURL + 'attendance/create_staffpermission/' ,payload , header )
  }
 
  public editStaff(data: any, header: any): Observable<any> {
    header= this.getHeader();
    let body = data.id
    return this.http.put(this.mainURL + 'staffEdit/' + body, data, header)
  }
  public createNewLedger(item: any, header: any): Observable<any> {
    header= this.getHeader();
    return this.http.post(this.mainURL + 'create_ledger/', item, header)
  }
  public ledgerList(id: any, header: any): Observable<any> {
    header= this.getHeader();
    let body = { "company": id };
    return this.http.post(this.mainURL + 'getledger/', body, header)
  }

  public createLedgerCategory(company: any): Observable<any> {
    let header= this.getHeader();
    let body = { company: company }
    return this.http.post(this.mainURL + 'ledger_under/', body,header)
  }

  public editLedger(data: any, header: any): Observable<any> {
    header= this.getHeader();
    let body = data.id
    return this.http.put(this.mainURL + 'update_ledger/' + body + '/', data, header)
  }

  public createCashLedger(item: any, header: any): Observable<any> {
    header= this.getHeader();
    return this.http.post(this.mainURL + 'cash/', item, header)
  }

  public cashLedgerList(id: any, header: any): Observable<any> {
    header= this.getHeader();
    return this.http.post(this.mainURL + 'getcash/', id, header)
  }
  public editCashLedger(data: any, header: any): Observable<any> {
    header= this.getHeader();
    return this.http.put(this.mainURL + 'edit_cash/', data, header)
  }
  public getReceivedFor(): Observable<any> {
    let company_id = JSON.parse(sessionStorage.getItem("currentCompany"));
    let body = { company: company_id[0].id }
    let header= this.getHeader();
    return this.http.post(this.mainURL + 'recieved_for/', body,header)
  }
  public createPaymentIn(item: any, header: any): Observable<any> {
    header= this.getHeader();
    return this.http.post(this.mainURL + 'payment_in/', item, header).pipe(
      catchError(this.handleError)
    )
  }

  public createPaymentOut(item: any, header: any): Observable<any> {
    header= this.getHeader();
    return this.http.post(this.mainURL + 'paymentout_against_invoice/', item, header).pipe(
      catchError(this.handleError)
    )
  }
  
  // public editPaymentOut(id: number, data: any, header: any): Observable<any> {
  //   console.log(" data recieving from staff", data);
  //   //let body={"bank_id":data.id};
  //   // edit_payment_out
  //   return this.http.put(this.mainURL + 'Edit_PaymentOut_AgainstInvoice/' + id + '/', data, header).pipe(
  //     catchError(this.handleError)
  //   )
  // }
  public verifyASP_Creds(data: any): Observable<any> {
    return this.http.post(this.einvoiceURL + 'verify_creds/', data)
  }
  public createInvoice(item: any, header: any): Observable<any> {
    header= this.getHeader();
    return this.http.post(this.mainURL + 'create_invoice/', item, header).pipe(
      catchError(this.handleError)
    )
  }
  public createEwb(data: any): Observable<any> {
   let header= this.getHeader();
    return this.http.post(this.einvoiceURL + 'ewb_only/', data,header)
  }
  public get_ewb(data: any): Observable<any> {
   let header= this.getHeader();
    return this.http.post(this.einvoiceURL + 'get_ewb/', data,header)
  }
  public geteinvoice(data: any): Observable<any> {
    return this.http.post('https://api.esarwa.com/einvoicing/gen_irn/', data).pipe(
      catchError(this.handleError)
    )
  }
  public receivedGST(header): Observable<any> {
    header= this.getHeader();
    return this.http.post(this.mainURL + 'gst/', null,header)
  }

  public receivedUnit(header): Observable<any> {
    header= this.getHeader();
    return this.http.post(this.mainURL + 'unit/',null, header)
  }
  public receivedState(): Observable<any> {
    return this.http.post(this.mainURL + 'placeofsupply/', null)
  }
  public listIndustryType(): Observable<any> {
    return this.http.post(this.mainURL + 'industry_type/', null)
  }
  public listBusinessType(): Observable<any> {
    return this.http.post(this.mainURL + 'business_type/', null)
  }
 
  public purchaseRegister(item: any, header: any): Observable<any> {
    let body = item.companyId
    header= this.getHeader();
    return this.http.post(this.mainURL + 'purchase_register/' + body, item, header).pipe(
      catchError(this.handleError)
    )
  }
    public salesRegister(value,t,header) {
      let p=this.mainURL + 'SearchSalReg/' 
       header=this.getHeader()
      return this.http.post(p+'s=' + value +'/',t,header).pipe(
        catchError(this.handleError)
      )
    }
    public attendancereport(value,t) {
      let p=this.mainURL + 'attendance/employee_attendance/' 
      return this.http.post(p + value +'',t).pipe(
        catchError(this.handleError)
      )
    }
    public searchsalesdetails(value,t,header) {
      let p=this.mainURL+'SearchSalesRegister_Indetail/'
      header=this.getHeader()
           return this.http.post(p+'s='+value+'/',t,header).pipe(
        catchError(this.handleError)
      )
    }
    public purchasRegister(value,k,header) {
      let p=this.mainURL + 'SearchPurReg/' 
      header=this.getHeader()
      return this.http.post(p+'s=' + value +'/',k,header).pipe(
        catchError(this.handleError)
      )
    }
    public partyWiseSale(value,t,header) {
      let p=this.mainURL + 'partywise_sales/' 
      header=this.getHeader()
      return this.http.post(p+'s=' + value +'/',t,header).pipe(
        catchError(this.handleError)
      )
    }
    public partyWisepurch(value,t,header) {
      let p=this.mainURL + 'partywisepurchase/' 
      header=this.getHeader()
      return this.http.post(p+'s=' + value +'/',t,header).pipe(
        catchError(this.handleError)
      )
    }

    public purchrg(value,t,header) {
      let p=this.mainURL + 'SearchPurReg/' 
      header=this.getHeader()
      return this.http.post(p+'s=' + value +'/',t,header).pipe(
        catchError(this.handleError)
      )
    }
    public purchrgOrder(value,t,header) {
      let p=this.mainURL + 'purchase_order_reg/' 
      header=this.getHeader()
      return this.http.post(p+'s=' + value +'/',t,header).pipe(
        catchError(this.handleError)
      )
    }
    public ItemSearch(value,t,header) {
     
      let p=this.mainURL + 'partywise_sales/' 
      return this.http.post(p+'s=' + value +'/',t).pipe(
        catchError(this.handleError)
      )
    }
 
   public itemWiseSales(value,t,header) {
    let p=this.mainURL + 'item_wise_sales_pag/' 
     header=this.getHeader()
    return this.http.post(p+'s=' + value +'/',t,header).pipe(
      catchError(this.handleError)
    )
  }
  public itemWisePurchase(value,t,header) {
    header=this.getHeader()
    let p=this.mainURL + 'item_wise_purchase_pag/' 
    return this.http.post(p+'s=' + value +'/',t,header).pipe(
      catchError(this.handleError)
    )
  }

  public partywisePurchase(item: any, header: any): Observable<any> {
    let body = { company: item };
    return this.http.post(this.mainURL + 'party_wise_purchase/', body, header)

  }
  public partywiseSales(item: any, header: any): Observable<any> {
    let body = { company: item };
    return this.http.post(this.mainURL + 'party_wise_sales/', body, header)
  }

  public billwiseProfit(value,t) {
    let p=this.mainURL + 'bill_wise_profit_pag/' 
    return this.http.post(p+'s=' + value +'/',t).pipe(
      catchError(this.handleError)
    )
  }

  public partywiseItemPurchase(item: any, header: any): Observable<any> {
    header=this.getHeader()
    return this.http.post(this.mainURL + 'party_wise_item_purchase/', item, header)
  }

  // public partywiseItemSales(item: any, header: any): Observable<any> {
  //   return this.http.post(this.mainURL + 'party_wise_item_sales_new/', item, header)
  // }
  public partywiseItemSales(value,t,header) {
    let p=this.mainURL + 'party_wise_item_sales_new/' 
    header=this.getHeader()
    return this.http.post(p+'s=' + value ,t,header).pipe(
      catchError(this.handleError)
    )
  }
  
  public partywiseItemPurch(value,t,header) {
    let p=this.mainURL + 'party_wise_item_purchases/' 
    header=this.getHeader()
    return this.http.post(p+'s=' + value ,t,header).pipe(
      catchError(this.handleError)
    )
  }
  public EwaybillReg(value,t,header) {
    let p=this.mainURL + 'EWBillRegister_pag/' 
    header=this.getHeader()
    return this.http.post(p+'s=' + value +'/',t,header).pipe(
      catchError(this.handleError)
    )
  }
  public EinvoiceReg(value,t,header) {
    let p=this.mainURL + 'E_InvoiceRegister_pag/' 
    header=this.getHeader()
    return this.http.post(p+'s=' + value +'/',t,header).pipe(
      catchError(this.handleError)
    )
  }
  public expenseRegister(value, data) {
    // let body = item.companyId
    let header = this.getHeader()
    return this.http.post(this.mainURL + 'search_expense/s=' + value + '/', data, header).pipe(
      catchError(this.handleError)
    )
  }
  public PaymentRegister(value, data) {
    // let body = item.companyId
    let header = this.getHeader()
    return this.http.post(this.mainURL + 'payment_register/s=' + value + '/', data, header).pipe(
      catchError(this.handleError)
    )
  }
  public voucherRegister(value, data) {
    // let body = item.companyId
    let header = this.getHeader()
    return this.http.post(this.mainURL + 'voucher_report/s=' + value + '/', data, header).pipe(
      catchError(this.handleError)
    )
  }

  public getexpenseCategory(a: any, header: any): Observable<any> {
    let body = { company_id: a }
    return this.http.post(this.mainURL + 'get_expense_category/', body, header)
  }

  public createNewExpenseCategory(item: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'exp/', item, header)
  }

  public createNewExpense(item: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'create_expense/', item, header).pipe(
      catchError(this.handleError)
    )
  }

  public createJournalVoucher(item: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'create_voucher/', item, header)
  }
  public getPaidReceived(item: any, header: any): Observable<any> {
    let body = item.company
    return this.http.post(this.mainURL + 'paid_received/' + body + '/', item, header)
  }

  public selectedCashLedger(item: any, header: any): Observable<any> {
    let body = { "company_id": item.company_id }
    return this.http.post(this.mainURL + 'getcash/', body, header)
  }

  public invoicePDF(item: any, header: any): Observable<any> {
    return this.http.get(this.mainURL + 'create_pdf/' + item + '/', header)
  }

  public getJVLedger(item: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'getJVledgers/', item, header)
  }
  public categoryReport(item: any, header: any): Observable<any> {
    let body = item.company_name
    return this.http.post(this.mainURL + 'expense_report/' + body, item, header)
  }
  public postData(data, apiurl) {
    let baseUrl = "https://esarwa.com/for_api/Esarwa_Api/public/";
    let url = baseUrl + apiurl;
    return this.http.post(url, data,
      { headers: new HttpHeaders({ "content-type": "application/json" }) });
  }

  public getData(apiurl) {
    let baseUrl = "https://esarwa.com/for_api/Esarwa_Api/public/";
    let url = baseUrl + apiurl;
    return this.http.get(url,
      { headers: new HttpHeaders({ "content-type": "application/json" }) });
  }

  public viewBankLedger(item: any, header: any): Observable<any> {
    let body = item.bank_id
    return this.http.post(this.mainURL + 'get_bank_ledger/' + body + '/', item, header)
  }

  public viewCashLedger(item: any, header: any): Observable<any> {
    let body = item.bank_id
    let comp = item.company_name
    return this.http.post(this.mainURL + 'get_cash_ledger/' + body + '/' + comp, item, header)
  }

  public editCompany(item: any, header: any): Observable<any> {
    let body = item.id
    return this.http.put(this.mainURL + 'company/' + body, item, header)
  }
  public getParticularInvoice(item: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'get_particular_invoice/', item, header).pipe(
      catchError(this.handleError)
    )
  }

  public expenseCategoryReport(item: any, header: any): Observable<any> {
    let body = item.category_id
    return this.http.post(this.mainURL + 'expense_report_data/' + body + '/', item, header)
  }

  public ledgerReport(id: any, header: any): Observable<any> {
    let body = { "company_id": id };
    return this.http.post(this.mainURL + 'display_ledger_report/', body, header)
  }
  public paymentGateway(paymentData: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'create_paytm_ac/', paymentData, header)
  }
  public editParticularInvoice(id: any, header: any): Observable<any> {
    return this.http.put(this.mainURL + 'update_invoice/', id, header).pipe(
      catchError(this.handleError)
    )
  }
  public gstr2(id: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'purchase_reg_gstr/', id, header)
  }
  public gstr3Sales(id: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'sales_reg_gstr/', id, header)
  }
  public gstr3Purchase(id: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'purchase_reg_gstr/', id, header)
  }

  public getParticularParty(data: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'particular_party/', data, header)
  }
  public getDashboard(company: any): Observable<any> {
    let header = this.getHeader();
    return this.http.post(this.mainURL + 'dashboard_data/', company, header)

  }
  public defaultDate(): Observable<any> {
    let header = this.getHeader();
    return this.http.post(this.mainURL + 'get_default_date/', header)

  }

  public paymentMode(): Observable<any> {
    let header = this.getHeader();
    return this.http.post(this.mainURL + 'payment_mode/', header)
  }

  public partyTransaction(id: any, header: any): Observable<any> {
    let body = id.party
    header=this.getHeader();
    return this.http.post(this.mainURL + 'get_party_ledger_pag/' + body + '/', id,header)
  }

  public getParticularPayment(p:any,paymentData: any): Observable<any> {
    // let body = paymentData.id
    let header=this.getHeader()
    return this.http.post(this.mainURL + 'particular_payment/' + p, paymentData, header)
  }

  public editPaymentOut(paymentData: any, header: any): Observable<any> {
    let body = paymentData.pk
    return this.http.put(this.mainURL + 'edit_payment_out/' + body + '/', paymentData, header).pipe(
      catchError(this.handleError)
    )
  }
  public editPaymentUotDemo(id: any, data: any, header: any): Observable<any> {
    console.log(" data recieving from staff", data);
    return this.http.put(this.mainURL + 'Edit_PaymentOut_AgainstInvoice/' + id + '/', data, header).pipe(
      catchError(this.handleError)
    )
  }
  public editPaymentIn(paymentData: any, header: any): Observable<any> {
    let body = paymentData.pk
    return this.http.put(this.mainURL + 'edit_payment_in/' + body + '/', paymentData, header).pipe(
      catchError(this.handleError)
    )
  }
  public editPaymentInDemo(id: any, data: any, header: any): Observable<any> {
    console.log(" data recieving from staff", data);
    return this.http.put(this.mainURL + 'Edit_PaymentIn_AgainstInvoice/' + id + '/', data, header).pipe(
      catchError(this.handleError)
    )
  }
  // public editPaymentInDemo(paymentData: any, header: any): Observable<any> {
  //   let body = paymentData.pk
  //   return this.http.put(this.mainURL + 'edit_payment_in/' + body +'/', paymentData, header).pipe(
  //     catchError(this.handleError)
  //   )
  // }

  public particularExpenseData(id: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'particular_expense/', id, header)
  }
  public submitTransportDetails(data: any): Observable<any> {
    return this.http.post(this.einvoiceURL + 'transport_details/', data)
  }
  public editExpense(id: any, header: any): Observable<any> {
    return this.http.put(this.mainURL + 'edit_expense/', id, header).pipe(
      catchError(this.handleError)
    )
  }
  public gstr1B2CLarge(id: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'gst1_b2c_large/', id, header)
  }
  public export(id: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'gst1_export/', id, header)
  }
  public gstr1B2B(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'gst1_b2b/', company, header)
  }
  public gstr1B2CSmall(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'gst1_b2c_small/', company, header)
  }
  public gstr1CreaditNoteR(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'gst1_cn_reg/', company, header)
  }
  public gstr1CreaditNoteU(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'gst1_cn_unreg/', company, header)
  }
  public gstr1NilRated(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'nil_rated/', company, header)
  }
  public gstr1DocSummary(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'document_summary/', company, header)
  }
  public gstr1HSNSummary(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'hsn_summary/', company, header)
  }
  public trailBalance(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'trial_balance/', company, header)
  }
  public trailBalanceData(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'trial_balance_data/', company, header)
  }
  public particularTrailBalance(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'trial_balance_details/', company, header)
  }
  public getInvoiceNo(company: any, header: any): Observable<any> {
    let body = { company: company };
    return this.http.post(this.mainURL + 'invoice_prefix/', body, header)
  }

  public exportSalesRegister(company: any, header: any): Observable<any> {
    let body = company.companyId
    return this.http.post(this.mainURL + 'sales_register_excel/' + body, company, header)
  }
  public exportBillwiseProfit(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'bill_profit_excel/', company, header)
  }
  public exportItemWiseSales(company: any, header: any): Observable<any> {
    let body = { company: company }
    return this.http.post(this.mainURL + 'item_sales_excel/', body, header)
  }
  
  public exportPurchaseRegister(company: any, header: any): Observable<any> {
    let body = company.companyId
    return this.http.post(this.mainURL + 'purchase_register_excel/' + body, company, header)
  }
  public exportItemWisePurchase(company: any, header: any): Observable<any> {
    let body = { company: company }
    return this.http.post(this.mainURL + 'item_purchase_excel/', body, header)
  }
  public exportPartywisePurchase(company: any, header: any): Observable<any> {
    let body = { company: company }
    return this.http.post(this.mainURL + 'party_purchase_excel/', body, header)
  }
  public exportPartywiseSales(company: any, header: any): Observable<any> {
    let body = { company: company }
    return this.http.post(this.mainURL + 'party_sales_excel/', body, header)
  }

  public exportGstr1(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'gstr1_excel/', company, header)
  }
  public exportGstr2(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'gstr2/', company, header)
  }
  public exportGstr3(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'gstr3b/', company, header)
  }
  public getCompanyId() {
    let company_id = JSON.parse(sessionStorage.getItem("currentCompany"));
    return company_id[0].id;
  }
  public forgotPassword(data: any) {
    // return this.http.post(this.esarwa_url + 'forget_password', data, { headers: new HttpHeaders({ "content-type": "application/json" }) })
    return this.http.post(this.mainURL + 'forgotpasswordotp/', data, { headers: new HttpHeaders({ "content-type": "application/json" }) })
  }

  // public verifyPassword(data: any) {
  //   return this.http.post(this.esarwa_url + 'verify_otp', data, { headers: new HttpHeaders({ "content-type": "application/json" }) })
  // }
  public verifyPassword(data: any) {
    return this.http.post(this.mainURL + 'otpverify/', data, { headers: new HttpHeaders({ "content-type": "application/json" }) })
  }

  public savePassword(data: any) {
    // return this.http.post(this.esarwa_url + 'new_password', data, { headers: new HttpHeaders({ "content-type": "application/json" }) })
    return this.http.post(this.mainURL + 'new_password', data, { headers: new HttpHeaders({ "content-type": "application/json" }) })

  }

  public sendOtp(data: any) {
    // return this.http.post(this.esarwa_url + 'mobile_otp', data, { headers: new HttpHeaders({ "content-type": "application/json" }) })
    return this.http.post(this.mainURL + 'otpgenerate/', data, { headers: new HttpHeaders({ "content-type": "application/json" }) })
  }

  public registersubmit(data: any) {
    return this.http.post(this.mainURL + 'register_user', data, { headers: new HttpHeaders({ "content-type": "application/json" }) })
  }
  public registersubmit1(data: any) {
    return this.http.post(this.subscription + 'register/', data, { headers: new HttpHeaders({ "content-type": "application/json" }) })
  }

  public fakeData(data: any) {
    return this.http.get("https://reqres.in/api/users?page=" + data)
  }


  public addNewEmployee(company: any, header: any): Observable<any> {
    return this.http.post("https://api.esarwa.com/api/attendance/" + 'create_employee/', company, header)
  }

  public addSalaryData(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'create_sal/', company, header)
  }
  public payrollSetting(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'payroll_settings/', company, header)
  }
  public employeeDetails(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'employee_details/', company, header)
  }
  public getEmployee(header: any,id:any): Observable<any> {
    header=this.getHeader()
    return this.http.get("https://api.esarwa.com/api/attendance/"+ 'get_employee/'+id+'/',header)

  }
  public updateEmployee(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'attendance/update_employee/', company, header)
  }
  public getSalaryStructure(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'get_salary_structure/', company, header)
  }
  public updateSalaryData(company: any, header: any): Observable<any> {
    return this.http.put(this.mainURL + 'create_sal/', company, header)
  }
  public attendenceDetails(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'attendance_details/', company, header)
  }
  public createAttendence(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'create_attendance/', company, header)
  }
  public showSalarySummary(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'show_salary_summary/', company, header)
  }

  public showSalaryDetails(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'show_salary_details/', company, header)
  }
  public taxDeduction(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'tax_deduction/', company, header)
  }
  public summarySalary(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'show_salary_summary/', company, header)
  }
  public detailsSalary(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'salary_reg/', company, header)
  }
  public leaveReport(company: any, header: any): Observable<any> {
    return this.http.post("https://api.esarwa.com/api/attendance/" + 'get_all_employees/',company, header)
  }
  public getAllPermissionR(company: any, header: any): Observable<any> {
    return this.http.post("https://api.esarwa.com/api/attendance/" + 'getall_staffpermission/',company, header)
  }
  public getstaffPermission(id:any, header: any): Observable<any> {
    return this.http.get("https://api.esarwa.com/api/attendance/" + 'get_staffpermission/'+id+'/', header)
  }
  public updateStaffPermission( payload:any ,header: any): Observable<any> {
    header=this.getHeader()
    return this.http.post("https://api.esarwa.com/api/attendance/"+ 'edit_staffpermission/',payload, header)
      .pipe(catchError(this.handleError)
      )
  }
  public AllempAttendance( header: any,id:any,value): Observable<any> {
    // header=this.getHeader()
    return this.http.post("https://api.esarwa.com/api/attendance/"+ 'all_employee_attendance/'+id+'/',header,value)
      .pipe(catchError(this.handleError)
      )
  }
  public updateAttendance( payload:any ,header: any): Observable<any> {
    header=this.getHeader()
    return this.http.post("https://api.esarwa.com/api/attendance/"+ 'attendance_update_create/',payload, header)
      .pipe(catchError(this.handleError)
      )
  }
  
  public deleteEmployee( header: any,id:any): Observable<any> {
    header=this.getHeader()
    return this.http.get("https://api.esarwa.com/api/attendance/"+ 'delete_employee/'+id+'/',header)
      .pipe(catchError(this.handleError)
      )
  }
  public exportLeaveRegister(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'export_leaves_report/', company, header)
  }
  public monthlyAttendence(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'monthly_attendance/', company, header)
  }
  public downloadPayslip(company: any, header: any): Observable<any> {
    let body = company.id
    console.log("data received", company);

    return this.http.post(this.mainURL + 'download_payslip/' + body + '/', company, header)
  }
  public taxDeduction1(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'tax_calculation/', company, header)
  }

  public allSalaryStructure(company: any, header: any): Observable<any> {
    let body = { employee_id: company }
    return this.http.post(this.mainURL + 'all_sal_struc/', body, header)
  }

  public homeRent(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'house_rent/', company, header)
  }
  public homeLoan(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'home_loan_interest/', company, header)
  }
  public fakeData1(data: any, header: any): Observable<any> {
    let body = data.company_id
    return this.http.post(this.mainURL + 'sales_reg_pag/' + body, data, header)
  }
  public eightyC(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'eighty_c/', company, header)
  }

  public eightyE(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'eighty_e/', company, header)
  }
  public eightyDD(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'eighty_dd/', company, header)
  }
  public eightyCCD1(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'eighty_ccd1b/', company, header)
  }
  public getEightyC(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'get_eighty_c/', company, header)
  }
  public updateRegime(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'confirm_regime/', company, header)
  }
  public eightyDform(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'eighty_d/', company, header)
  }
  public getEightyCC(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'get_eightyccd1b/', company, header)
  }
  public getEightyDD(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'get_eightydd/', company, header)
  }
  public getEightyE(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'get_eightye/', company, header)
  }
  public getEightyD(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'get_eightyd/', company, header)
  }
  public getEarnings(EarningData: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'tax_earnings/', EarningData, header)
  }
  public exportToExceSalary(SalaryData: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'salary_register_excel/', SalaryData, header)
  }
  public deleteBank(bankId: any, header: any): Observable<any> {
    return this.http.delete(this.mainURL + 'bankd/' + bankId, header)
  }
  public postQrData(data): Observable<any> {
    return this.http.post("https://api.esarwa.com/api/post_qr_login_data/", data)
  }
  public Cashwithdrow(cashWithdrowData: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'cash_withdrawal/', cashWithdrowData, header)
  }
  public CashDeposit(cashDepositData: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'cash_deposit/', cashDepositData, header)
  }
  public bankToBank(bankData: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'bank_to_bank/', bankData, header)
  }
  public deleteParty(PartyId: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'delete_party/', PartyId, header).pipe(
      catchError(this.handleError)
    )
  }
  public deleteItem(ItemId: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'delete_item/', ItemId, header).pipe(
      catchError(this.handleError)
    )
  }
  public deleteLedger(ledgerId: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'delete_ledger/', ledgerId, header)
  }
  public deleteCash(cashId: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'delete_cash/', cashId, header)
  }
  public deleteStaff(staffId: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'delete_staff/', staffId, header).pipe(
      catchError(this.handleError)
    )
  }
  public deleteExpense(expenseId: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'delete_expense/', expenseId, header).pipe(
      catchError(this.handleError)
    )
  }
  public deletePaymentIn(paymentInId: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'delete_pay_in_out/', paymentInId, header).pipe(
      catchError(this.handleError)
    )
  }
  public deleteInvoice(expenseId: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'delete_invoice/', expenseId, header)
      .pipe(catchError(this.handleError)
      )
  }
  public getJournalVoucher(voucherData: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'get_particular_voucher/', voucherData, header)
  }
  public editJournalVoucher(voucherData: any, header: any): Observable<any> {
    return this.http.put(this.mainURL + 'edit_voucher/', voucherData, header)
  }
  public viewQuatation(value,t,header) {
    let p=this.mainURL + 'quotation_report/' 
    header=this.getHeader()
    return this.http.post(p+'s=' + value +'/',t,header).pipe(
      catchError(this.handleError)
    )
  }
  public viewChallan(value,t,header) {
    let p=this.mainURL + 'challan_report/' 
    header=this.getHeader()
    return this.http.post(p+'s=' + value +'/',t,header).pipe(
      catchError(this.handleError)
    )
  }
  public exportChallan(challanData: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'challan_excel/', challanData, header)
  }
  public exportQuatation(quaData: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'quotation_excel/', quaData, header)
  }
  public deleteVoucher(voucherData: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'delete_voucher/', voucherData, header).pipe(
      catchError(this.handleError)
    )
  }

  public sendRemainder(invoiceID: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'payment_remainder/' + invoiceID + "/", header)
  }
  public getparticularContraEntry(id: any, header: any): Observable<any> {
    let body = { id: id }
    return this.http.post(this.mainURL + 'particular_contra_entry/', body, header)
  }
  public editBankToBank(transactionData: any, header: any): Observable<any> {
    let body = transactionData.id
    return this.http.patch(this.mainURL + 'edit_bank_to_bank/' + body + "/", transactionData, header)
  }
  public editCashWithdrow(transactionData: any, header: any): Observable<any> {
    let body = transactionData.id
    return this.http.patch(this.mainURL + 'edit_cash_withdrawal/' + body + "/", transactionData, header)
  }
  public editCashDeposit(transactionData: any, header: any): Observable<any> {
    let body = transactionData.id
    return this.http.patch(this.mainURL + 'edit_cash_deposit/' + body + "/", transactionData, header)
  }
  public deleteContra(contraID: any, header: any): Observable<any> {
    return this.http.delete(this.mainURL + 'delete_contra/' + contraID + '/', header)
  }
  public getPricing(): Observable<any> {
    return this.http.get(this.subscription + 'get_plans/')
  }
  public paySubcription(orderData: any): Observable<any> {
    return this.http.patch(this.subscription + 'payment_order/', orderData)
  }
  public verifySignature(data: any): Observable<any> {
    return this.http.post(this.subscription + 'verify_signature/', data)
  }
  public eInvoice(eInvoiceData: any, header: any): Observable<any> {
    return this.http.post(this.einvoiceURL + 'save_creds/', eInvoiceData, header)
  }
  public getVoucher(data: any): Observable<any> {
    return this.http.get(this.subscription + 'get_voucher/' + data + "/")
  }
  public trailSubscription(data: any): Observable<any> {
    return this.http.post(this.subscription + 'create_trial/', data)
  }
  public getSubscription(mobileno: any): Observable<any> {
    let option=this.getHeader()
    return this.http.get(this.subscription + 'get_subscriptions/' + mobileno + "/", option)
  }
  public UpgradeSubcription(orderData: any): Observable<any> {
    return this.http.patch(this.subscription + 'upgrade_plan/', orderData)
  }
  public edit_signature(data: any): Observable<any> {
    let option = this.getHeader();
    return this.http.put(this.mainURL + 'company_signature/', data, option)
  }
  public edit_logo(data: any): Observable<any> {
    let option = this.getHeader();
    return this.http.put(this.mainURL + 'company_logo/', data, option)
  }
  public deleteAccount(mobileno: any): Observable<any> {
    return this.http.get(this.subscription + 'delete_account/' + mobileno, mobileno)
  }
  public deactiveAccount(mobileno: any): Observable<any> {
    return this.http.get(this.subscription + 'deactivate_account/' + mobileno, mobileno)
  }
  public reactiveAccount(mobileno: any): Observable<any> {
    return this.http.get(this.subscription + 'activate_account/' + mobileno, mobileno)
  }
  public role(data: any): Observable<any> {
    return this.http.post(this.subscription + 'get_staff_details/', data)
  }
  public role2(url: any, data: any) {
    let option = this.getHeader();
    return this.http.post(this.subscription + url, data, option).pipe(
      catchError(this.handleError)
    )
  }
  public role1(data: any): Observable<any> {
    return this.http.post(this.subscription + 'get_staff_permissions/',data)
  }

  private handleError(error: HttpErrorResponse) {
    let errormessage = ''
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.log(typeof (error), '---')
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error.message);
      errormessage = error.error.message;
      console.log("errormessage", errormessage);

    }
    let errormessage1 = 'Something went Wrong.'
    return throwError((errormessage));
  }
 
  public getlistcompany(data: any, header: any): Observable<any> {
    console.log("mobile", data.user[0].mobile);
    return this.http.post(this.mainURL + 'get_company_list/' + data.user[0].mobile, null, header)
  }
  public getCountStaff(companyId: any): Observable<any> {
    let data = { company: companyId }
    return this.http.post(this.subscription + 'get_count_by_staff/', data)
  }
  public getSubscription1(companyId: any): Observable<any> {
    let data = { company: companyId }
    return this.http.post(this.subscription + 'company_wise_subscription/', data)
  }

  public createLedgerGroup(Data: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'create_group/0', Data, header)
  }
  public getparticularPartyInvoice(data: any, header: any): Observable<any> {
    return this.http.get(this.mainURL + 'get_sales_by_party/' + data.party_id + '/', header)
  }

  public createPaymentInDemo(item: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'pay_against_inv/', item, header).pipe(
      catchError(this.handleError)
    )
  }

  public getparticularPaymentInInvoice(data: any, header: any): Observable<any> {
    return this.http.get(this.mainURL + 'get_all_sales_by_party/' + data.party_id + '/', header)
  }

  public CreateRole(data:any,header:any):Observable<any>{
    return this.http.post(this.mainURL + 'custom_role/',data,header)
  }
  public getRole(data:any,header:any):Observable<any>{
    return this.http.post(this.subscription + 'get_all_roles/',data,header)
  }
  public getWeeklySales(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'get_weekly_sales/' + company, null, header).pipe(
      catchError(this.handleError)
    )
  }
  public roleInfo(data:any,header:any):Observable<any>{
    return this.http.post(this.mainURL + 'roleinfo/',data,header)
  }
  public updateInfo(data:any,header:any):Observable<any>{
    return this.http.post(this.mainURL + 'updaterole/',data,header)
  }
  // public proformaRegister(item: any, header: any): Observable<any> {
  //   let body = item.companyId
  //   return this.http.post(this.mainURL + 'proforma_register/' + body, item, header)
  // }
  public proformaRegister(value,t,header) {
    let p=this.mainURL + 'search_proforma_reg/' 
    header=this.getHeader()
    return this.http.post(p+'s=' + value +'/',t,header).pipe(
      catchError(this.handleError)
    )
  }
  // search_proforma_reg/s
  public post1(url: any, data: any) {
    let option = this.getHeader();
    return this.http.post(this.einvoiceURL + url, data, option).pipe(
      catchError(this.handleError)
    )
  }
  public post2(url: any, data: any) {
    let option = this.getHeader();
    return this.http.post(this.subscription + url, data, option).pipe(
      catchError(this.handleError)
    )
  }
  public post3(url: any, data: any) {
    let option = this.getHeader();
    return this.http.post(this.mainURL + url,data, option).pipe(
      catchError(this.handleError)
    )
  }
  getItemCategory(header) {
    header=this.getHeader()
    return this.http.get(this.mainURL + 'get_item_groups/' + this.getCompanyId() + '/',header);
  }

  createCategory(data) {
    return this.http.post(this.mainURL + 'create_item_groups/', data);
  }
  public deletGroup(company: any,header): Observable<any> {
    header=this.getHeader()
    return this.http.get(this.mainURL + 'delete_item_group/' + company+'/',header).pipe(
      catchError(this.handleError)
    )
  }

  public getCompanyDetails() {
    let companyDetail = JSON.parse(sessionStorage.getItem("currentCompany"));
    return companyDetail[0];
  }
  public categorySales(value, t,header) {
    let p = this.mainURL + 'categorywisesales/'
    header=this.getHeader()
    return this.http.post(p + 's=' + value + '/', t,header).pipe(
      catchError(this.handleError)
    )
  }
  public categoryPurchase(value, t,header) {
    let p = this.mainURL + 'categorywisepurchase/'
    header=this.getHeader()
    return this.http.post(p + 's=' + value + '/', t,header).pipe(
      catchError(this.handleError)
    )
  }
  public token_check(data: any): Observable<any> {
    return this.http.post(this.mainURL + 'validate_token/', data).pipe(
      catchError(this.handleError)
    )
  }
  public getTokenByRefresh(data:any): Observable<any> {
    return this.http.post('https://api.esarwa.com/auth/refresh_token/', data).pipe(
      catchError(this.handleError)
    )
  }

  public attendance(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'attendance/create_attendance/',company, header).pipe(
      catchError(this.handleError)
    )
  }
  public punchOut(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'attendance/punch_out/',company, header).pipe(
      catchError(this.handleError)
    )
  }
  public timer(company: any, header: any): Observable<any> {
    return this.http.post(this.mainURL + 'attendance/view_clock_in/',company, header).pipe(
      catchError(this.handleError)
    )
  }
}
