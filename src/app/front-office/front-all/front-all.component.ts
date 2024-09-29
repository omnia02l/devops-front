import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UserDTO } from 'src/app/core/models/userDTO';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
  selector: 'app-front-all',
  templateUrl: './front-all.component.html',
  styleUrls: ['./front-all.component.css']
})
export class FrontAllComponent {

  principal!: UserDTO;
  items: MenuItem[];
  constructor( private accountService: AccountService)
  {
    this.getPrincipal();

    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/home']},
   
      { label: 'Profile', icon: 'pi pi-fw pi-cog', routerLink: ['/profile'] }
    ];
  }
  getPrincipal() {
    this.accountService.getPrincipal().subscribe({
      next: (data) => {
        this.principal = data;
      }
    });
  }
}