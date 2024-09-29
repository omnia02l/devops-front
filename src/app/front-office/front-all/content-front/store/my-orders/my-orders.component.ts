import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderDTO } from 'src/app/core/models/order-dto';
import { AccountService } from 'src/app/core/services/account.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrderService } from 'src/app/core/services/order.service';
import { SharedstoreService } from 'src/app/core/services/sharedstore.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { MenuItem } from 'primeng/api';

pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders: OrderDTO[] = [];
 // items: MenuItem[];

  constructor(private orderService: OrderService, private authService: AuthService,  private router: Router,private sharedService: SharedstoreService ,private accountService: AccountService) {
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
    // Fetch user's information from session
    this.accountService.getPrincipal().subscribe(
      (user) => {
        // Extract user's email
        const userEmail = user.email;

        // Fetch orders for the current user using the email
        this.orderService.getOrderHistoryByEmail(userEmail).subscribe(
          orders => {
            this.orders = orders;
          },
          error => {
            console.error('Error fetching orders:', error);
          }
        );
      },
      error => {
        console.error('Error fetching user information:', error);
      }
    );
  }
  downloadInvoice(order: OrderDTO): void {
    console.log('Downloading invoice for order:', order);
  
    // Company information
    const companyInfo = {
      name: 'DanceScape Explorer',
      address: '123 Main Street, City, Country',
      phone: '+123-456-7890',
      email: 'info@dancescapeexplorer.com',
      website: 'www.dancescapeexplorer.com'
    };
  
    // Customer information (you can fetch it from order if available)
    const customerInfo = {
      name: 'Customer Name',
      email: 'customer@example.com',
      address: '456 Elm Street, City, Country',
      phone: '+987-654-3210'
    };
  
    // Define the products table content
    const productsTable = order.cartItems.map(item => {
      return [
       item['productName'],
      item['quantity'],
      
        { text: `$${item['amount'].toFixed(2)}`, alignment: 'right' },
        { text: `$${(item['amount'] * item['quantity']).toFixed(2)}`, alignment: 'right' }
      ];
    });
  
    // Define the document definition
    const documentDefinition: any = {
      pageSize: 'A4',
      pageMargins: [40, 60, 40, 60], // [left, top, right, bottom]
      header: {
        text: 'Invoice',
        fontSize: 20,
        alignment: 'center',
        margin: [0, 20, 0, 20]
      },
      footer: function(currentPage: number, pageCount: number) {
        return {
          text: `Page ${currentPage.toString()} of ${pageCount}`,
          alignment: 'center',
          margin: [0, 20, 0, 20]
        };
      
      
      },
      content: [
        // Company and customer information
        {
          columns: [
            { width: 'auto', text: `${companyInfo.name}\n${companyInfo.address}\nPhone: ${companyInfo.phone}\nEmail: ${companyInfo.email}\nWebsite: ${companyInfo.website}` },
            { width: '*', text: `Customer Name: ${customerInfo.name}\nEmail: ${customerInfo.email}\nAddress: ${customerInfo.address}\nPhone: ${customerInfo.phone}`, alignment: 'right' }
          ]
        },
        // Invoice details
        { text: `Invoice #${this.generateRandomCode()}`, style: 'header' }, // Generate random code here
        { text: `Order Date: ${order.dateCreation}`, style: 'subheader' },
        { 
          text: `Total Amount: $${order.totalAmount ? order.totalAmount.toFixed(2) : 'N/A'}`, 
          style: 'subheader', 
          margin: [0, 0, 0, 20] 
        },
                { text: 'Invoice Status:', style: 'subheader' },
        // Products table
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Product Name', 'Quantity', 'Price', 'Total'],
              ...productsTable
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 0, 0, 5]
        }
        // Define additional styles as needed...
      }
    };
  
    // Generate the PDF
    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
  
    // Download the PDF
    pdfDocGenerator.download(`Invoice_${this.generateRandomCode()}`);
  }
  generateRandomCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const length = 18;
    let randomCode = '';
    for (let i = 0; i < length; i++) {
      randomCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomCode;
  }
 /* downloadInvoice(order: OrderDTO): void {
  console.log('Downloading invoice for order:', order);

  // Define the products table content
  const productsTable = order.cartItems.map(item => {
    return [
      item['productName'],
      item['quantity'],
      item ['amount'],
      item ['amount'] * item['quantity']
    ];
  });

  // Define the document definition
  const documentDefinition: any = {
    content: [
      { text: `Invoice #${order.orderId}`, style: 'header' },
      { text: `Order Date: ${order.dateCreation}`, style: 'subheader' },
      { text: `Total Amount: ${order.totalAmount}`, style: 'subheader' },
      { text: 'Invoice Status:', style: 'subheader' },
      { text: 'Products:', style: 'subheader' },
      // Products table
      {
        table: {
          headerRows: 1,
          widths: ['*', 'auto', 'auto', 'auto'],
          body: [
            ['Product Name', 'Quantity', 'Price', 'Total'],
            ...productsTable
          ]
        }
      }
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 14,
        bold: true,
        margin: [0, 0, 0, 5]
      }
      // Define additional styles as needed...
    }
  };

  // Generate the PDF
  const pdfDocGenerator = pdfMake.createPdf(documentDefinition);

  // Download the PDF
  pdfDocGenerator.download(`Invoice_${order.orderId}`);
}*/
}