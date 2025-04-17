import { Injectable } from '@angular/core';
import { SMS } from '@ionic-native/sms/ngx';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private sms: SMS) 
  { }
  sendInvoiceNotification(mobile_number: string) {
    const message = `Invoice created successfully. Thank you for your business!`;
    this.sms.send(mobile_number, message)
      .then(response => {
        console.log('SMS sent successfully:', response);
        console.log(message,'jalgaonn',mobile_number);
        
      })
      .catch(error => {
        console.error('Error sending SMS:', error);
        console.log(error,'mam',mobile_number);
      });
  }
}
