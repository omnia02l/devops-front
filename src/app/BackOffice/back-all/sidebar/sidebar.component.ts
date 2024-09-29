import { Component } from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  role!:string;
  constructor(private authService:AuthService) {
    this.role = this.authService.getFromLocalStorage('role')!;
  }

  logout() {
    this.authService.logout();
  }

  menuItems: any[] = [
    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] ,
      items: [
        { label: 'Competition Sales', icon: 'pi pi-fw pi-building', routerLink: ['/admin/totStat'] },
        { label: 'Product Sales', icon: 'pi pi-fw pi-map-marker', routerLink: ['/admin/ProductSales'] },
        { label: 'Competition trends  ', icon: 'pi pi-fw pi-map-marker', routerLink: ['/admin/compstat'] },
      ]
    },
    {
      label: 'Management', icon: 'pi pi-fw pi-sitemap',
      items: [
        { label: 'Accounts', icon: 'pi pi-fw pi-users', routerLink: ['/admin/account-management'] }

      ]
    },
    {
      label: 'Event Management ', icon: 'pi pi-fw pi-sitemap',
      items: [
       { label: 'Event', icon: 'pi pi-fw pi-user', routerLink: ['/admin/event-management']}
      ]
    },

    {
      label: 'Tickets Management', icon: 'pi pi-fw pi-ticket',
      items: [
        { label: 'Tickets', icon: 'pi pi-fw pi-plus', routerLink: ['/admin/Ticket'] },
        { label: 'Tickets Card', icon: 'pi pi-fw pi-list', routerLink: ['/admin/TicketCard'] },
        { label: 'Price', icon: 'pi pi-fw pi-list', routerLink: ['/admin/Price'] }
      ]
    },
    {
      label: 'Venue Management', icon: 'pi pi-fw pi-cog',
      items: [

        { label: 'Venue Plan', icon: 'pi pi-fw pi-sitemap', routerLink: ['/admin/VenuePlan'] },
        { label: 'Place', icon: 'pi pi-fw pi-map-marker', routerLink: ['/admin/Place'] },
      ]
    },
    {
      label: 'Store Management', icon: 'pi pi-fw pi-cog',
      items: [
        { label: 'Products', icon: 'pi pi-fw pi-building', routerLink: ['/admin/products'] },
        { label: 'Products Add', icon: 'pi pi-fw pi-sitemap', routerLink: ['/admin/products/add'] },
        { label: 'Categories', icon: 'pi pi-fw pi-map-marker', routerLink: ['/admin/categorys'] },

      ]
    },
    {
      label: 'Competition&Registration', icon: 'pi pi-fw pi-star-fill',
      items: [
        { label: 'Registrations', icon: 'pi pi-fw pi-building', routerLink: ['/admin/list-registrations'] },
        { label: 'Dance categories', icon: 'pi pi-fw pi-sitemap', routerLink: ['/admin/list-dancecategoryandstyle'] },
        { label: 'Competitions', icon: 'pi pi-fw pi-map-marker', routerLink: ['/admin/list-comp'] },
        { label: 'Towns&venues', icon: 'pi pi-fw pi-map-marker', routerLink: ['/admin/list-townsandvenues'] },
        { label: 'Teams in competitions', icon: 'pi pi-fw pi-map-marker', routerLink: ['/admin/list-teams-comp'] },
        { label: 'Dancers in teams', icon: 'pi pi-fw pi-map-marker', routerLink: ['/admin/list-teams-dancers'] },

      ]
    },
    {
      label: 'Training', icon: 'pi pi-fw pi-cog',
      items: [
        { label: 'Training', icon: 'pi pi-fw pi-building', routerLink: ['/admin/training-management'] },
        { label: 'Dance Hall', icon: 'pi pi-fw pi-sitemap', routerLink: ['/admin/dance-hall-management'] },
        { label: 'Coach ', icon: 'pi pi-fw pi-map-marker', routerLink: ['/admin/coach-management'] },
        { label: 'Post', icon: 'pi pi-fw pi-map-marker', routerLink: ['/admin/post'] },



      ]
    },
  ];



  toggleMenu(index: number): void {
    this.menuItems[index].expanded = !this.menuItems[index].expanded;
    // Optionally collapse other menus
    this.menuItems.forEach((item, idx) => {
      if (idx !== index) item.expanded = false;
    });
  }
}
