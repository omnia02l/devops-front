import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PaymentService } from 'src/app/core/services/payment.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent  implements OnInit {

  transactionId = "";
 // items: MenuItem[];
  constructor(private payment: PaymentService) {
   /* this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/home']},
      { label: 'My-events', icon: 'pi pi-fw pi-calendar', routerLink: ['/my-events']},
      { label: 'Training', icon: 'pi pi-fw pi-pencil',  routerLink: ['/training']},
      { label: 'My Post', icon: 'pi pi-fw pi-file', routerLink: ['/post'] },
      { label: 'All posts', icon: 'pi pi-fw pi-cog', routerLink: ['/all-post'] },
      { label: 'Profile', icon: 'pi pi-fw pi-cog', routerLink: ['/profile'] },
      { label: 'Store', icon: 'pi pi-credit-card', routerLink: ['/produits'] },
      { label: 'Cart Item', icon: 'pi pi-shopping-cart', routerLink: ['/shopcart'] },
      { label: 'Payement', icon: 'pi pi-fw pi-cog', routerLink: ['/payment'] },
      { label: 'My Orders', icon: 'pi pi-shopping-bag', routerLink: ['/myorders'] },
    ];*/
   }

  ngOnInit(): void {
    this.transactionId = this.payment.transactionID;
  }

}