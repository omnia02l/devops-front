import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UserDTO } from 'src/app/core/models/userDTO';
import { AccountService } from 'src/app/core/services/account.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-front-template',
  templateUrl: './front-template.component.html',
  styleUrls: ['./front-template.component.css']
})
export class FrontTemplateComponent implements AfterViewInit{
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  principal!: UserDTO;
  items: MenuItem[];

  constructor(private accountService: AccountService,private authService:AuthService) {
    this.getPrincipal();

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/front'],
        items: [
          { label: 'Sub Item 1', icon: 'pi pi-fw pi-plus', routerLink: ['/home'] },
          { label: 'Sub Item 2', icon: 'pi pi-fw pi-plus', routerLink: ['/home/subitem2'] }
        ]
      },
      {
        label: 'Profile',
        icon: 'pi pi-fw pi-cog',
        routerLink: ['/profile'],
        items: [
          { label: 'Edit Profile', icon: 'pi pi-fw pi-user-edit', routerLink: ['/profile/edit'] },
          { label: 'Settings', icon: 'pi pi-fw pi-cog', routerLink: ['/profile/settings'] }
        ]
      },

      {
        label: 'Competitions',
        icon: 'pi pi-fw pi-flag-fill',

        items: [
          { label: 'Calender', icon: 'pi pi-fw pi-calendar', routerLink: ['/calendercomp'] },
          { label: 'List', icon: 'pi pi-fw pi-bolt', routerLink: ['front/list-compfront'] },
          { label: 'Performances', icon: 'pi pi-fw pi-hourglass', routerLink: ['/listperformances'] },
          { label: 'Songs', icon: 'pi pi-fw pi-heart', routerLink: ['/Songsdetetct'] }
        ]
      },

      {
        label: 'Camera',
        icon: 'pi pi-fw pi-camera',
        routerLink: ['/QrScanner'],
        items: [
          { label: 'Gallery', icon: 'pi pi-fw pi-image', routerLink: ['/QrScanner/gallery'] },
          { label: 'Capture', icon: 'pi pi-fw pi-video', routerLink: ['/QrScanner/capture'] }
        ]
      },
      {
        label: 'Store',
        icon: 'pi pi-shopping-cart',
        //routerLink: ['/produits'],
        items: [
          { label: 'Products', icon: 'pi pi-shopping-cart', routerLink: ['/produits'] },

          { label: 'Cart Item', icon: 'pi pi-shopping-cart', routerLink: ['/shopcart'] },
          { label: 'Payment', icon: 'pi pi-credit-card', routerLink: ['/payment'] },
          { label: 'My Orders', icon: 'pi pi-shopping-bag', routerLink: ['myorders'] }

        ]
      }
    ];
  }
  ngAfterViewInit() {
    this.playVideo();
  }

  playVideo() {
    if (this.videoPlayer.nativeElement) {
      this.videoPlayer.nativeElement.play().catch(err => {
        console.error("Error attempting to play video:", err);
        // Handle errors like autoplay being blocked
      });
    }
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
