import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/core/services/payment.service';
import { ShopcartComponent } from '../shopcart/shopcart.component';
import { SharedstoreService } from 'src/app/core/services/sharedstore.service';
import { MenuItem } from 'primeng/api';
//declare const paypal: any;

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
 
/*amount = 5647;

@ViewChild('paymentRef', {static: true}) paymentRef!: ElementRef;
totalCartPrice: number = 0;
constructor(private router: Router, private payment: PaymentService, private sharedService: SharedstoreService) { 
 
}

ngOnInit(): void {
 
  paypal.Buttons(
    {
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: this.amount.toString(),
                currency_code: 'USD'
              }
            }
          ]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          console.log(details);
          console.log('Transaction completed by ' + details.payer.name.given_name);
          if(details.status==='COMPLETED'){
            this.payment.transactionID = details.id;
            this.router.navigate(['confirm']);
          }
        });
      },
      onError: (error: any) => {
        console.error('Transaction failed:', error);
      }
    }
  ).render(this.paymentRef.nativeElement);
}

cancel() {
  this.router.navigate(['produits']);
}
}*/

//amount = 5647;

@ViewChild('paymentRef', {static: true}) paymentRef!: ElementRef;
totalCartPrice: number = 0;//items: MenuItem[];
constructor(private router: Router, private payment: PaymentService, private sharedService: SharedstoreService) { 

}

ngOnInit(): void {
  this.sharedService.totalCartPrice$.subscribe(price => {
    this.totalCartPrice = price;
    
    // Render PayPal buttons after getting the total cart price
    paypal.Buttons(
      {
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: this.totalCartPrice.toString(), // Use totalCartPrice instead of this.amount
                  currency_code: 'USD'
                }
              }
            ]
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            console.log(details);
            console.log('Transaction completed by ' + details.payer.name.given_name);
            if(details.status==='COMPLETED'){
              this.payment.transactionID = details.id;
              this.router.navigate(['confirm']);
            }
            // Redirect to success page or handle success
          });
        },
        onError: (error: any) => {
          console.error('Transaction failed:', error);
          // Handle error
        }
      }
    ).render(this.paymentRef.nativeElement);
  });
}


cancel() {
  this.router.navigate(['produits']);
}
}