
import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api";
import { UserDTO } from "../../../../../core/models/userDTO";
import { AccountService } from "../../../../../core/services/account.service";
import {AuthService} from "../../../../../core/services/auth.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  videoSource!: string;
  principal!: UserDTO;
  role!:string;
  items: MenuItem[];

  constructor(private accountService: AccountService,private authService:AuthService,private route: ActivatedRoute) {
    this.getPrincipal();

    this.items = [

      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
       
        items: [
          { label: 'All posts', icon: 'pi pi-fw pi-cog', routerLink: ['/home/all-post'] },
        ]
      },
      {
        label: 'Profile',
        icon: 'pi pi-fw pi-cog',
        routerLink: ['/profile'],
        items: [
          { label: 'Profile', icon: 'pi pi-fw pi-cog', routerLink: ['/home/profile'] }
        ]
      

      },

      {
        label: 'Competitions',
        icon: 'pi pi-fw pi-flag-fill',

        items: [
          { label: 'Calender', icon: 'pi pi-fw pi-calendar', routerLink: ['/home/calendercomp'] },
          { label: 'List', icon: 'pi pi-fw pi-bolt', routerLink: ['/home/list-compfront'] },
          { label: 'Performances', icon: 'pi pi-fw pi-hourglass', routerLink: ['/home/listperformances'] },
          { label: 'Songs', icon: 'pi pi-fw pi-heart', routerLink: ['/home/Songsdetetct'] }
        ]
      },

      {
        label: 'Camera',
        icon: 'pi pi-fw pi-camera',
        routerLink: ['/home/QrScanner'],
      
      },
      {
        label: 'Store',
        icon: 'pi pi-shopping-cart',
        //routerLink: ['/produits'],
        items: [
          { label: 'Products', icon: 'pi pi-shopping-cart', routerLink: ['/home/produits'] },

          { label: 'Cart Item', icon: 'pi pi-shopping-cart', routerLink: ['/home/shopcart'] },
          { label: 'Payment', icon: 'pi pi-credit-card', routerLink: ['/home/payment'] },
          { label: 'My Orders', icon: 'pi pi-shopping-bag', routerLink: ['/home/myorders'] }

        ]
      },{
        label: 'Activity',
        icon: 'pi pi-shopping-cart',
       
        items: [
          { label: 'My-events', icon: 'pi pi-fw pi-calendar', routerLink: ['/home/my-events']},
          { label: 'Training', icon: 'pi pi-fw pi-pencil',  routerLink: ['/home/training']},
          
         
        ]
      
      }
  
    ];
  }

  ngOnInit(): void {
    this.route.url.subscribe(urlSegments => {
      console.log("URL Segments:", urlSegments);  // Log pour voir les segments d'URL détectés
      if (urlSegments.length === 1 && urlSegments[0].path === 'home') {
        this.videoSource = '/assets/FrontOffice/video/pexels-2022395.mp4';
        console.log("Home video loaded");  // Log lorsque la vidéo d'accueil est chargée
      } else {
        this.videoSource = '/assets/FrontOffice/video/background.mp4';
        console.log("Other video loaded");  // Log lorsque les autres vidéos sont chargées
      }
    });
    
  }

  getPrincipal() {
    this.accountService.getPrincipal().subscribe({
      next: (data) => {
        this.principal = data;
      }
    });
  }
  logout() {
    this.authService.logout();

  }

}
