import {Component, OnInit} from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {AccountService} from "../../../../../core/services/account.service";
import {UserDTO} from "../../../../../core/models/userDTO";
import {EditProfileRequest} from "../../../../../core/models/editProfileRequest";
import {UpdatePasswordRequest} from "../../../../../core/models/updatePasswordRequest";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [MessageService]
})
export class ProfileComponent implements OnInit {

  principal!: UserDTO;
  editProfileDialog: boolean = false;
  updatePasswordDialog: boolean = false;
  submitted: boolean = false;
  editProfileRequest: EditProfileRequest = {};
  message!: string;
  updatePasswordRequest: UpdatePasswordRequest = {};
  items: MenuItem[];
  constructor(private accountService: AccountService, private messageService: MessageService) {
    this.getPrincipal();
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/home']},
      { label: 'My-events', icon: 'pi pi-fw pi-calendar', routerLink: ['/my-events']},
      { label: 'Training', icon: 'pi pi-fw pi-pencil',  routerLink: ['/training']},
      { label: 'My Post', icon: 'pi pi-fw pi-file', routerLink: ['/post'] },
      { label: 'All posts', icon: 'pi pi-fw pi-cog', routerLink: ['/all-post'] },
      { label: 'Profile', icon: 'pi pi-fw pi-cog', routerLink: ['/profile'] }
    ];
  }

  ngOnInit(): void {

  }

  getPrincipal() {
    this.accountService.getPrincipal().subscribe({
      next: (data) => {
        this.principal = data;
      }, error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Server error', life: 3000});
      }
    })
  }

  editProfile() {
    this.submitted = true;
    if (this.editProfileRequest.firstName && this.editProfileRequest.lastName && this.editProfileRequest.emailAddress) {
      this.accountService.editProfile(this.editProfileRequest).subscribe({
        next: (data) => {
          this.messageService.add({severity: 'success', summary: 'Successful', detail: data, life: 3000});
          this.editProfileDialog = false;
          this.submitted = false;
          this.getPrincipal();
        },
        error: (err) => {
          const errObject = JSON.parse(err.error);
          this.message = errObject.message;
          this.messageService.add({severity: 'error', summary: 'Error', detail: this.message, life: 3000});
          this.editProfileDialog = false;
          this.submitted = false;
        }
      });
    }
  }

  updatePassword() {
    this.submitted = true;
    if (this.updatePasswordRequest.newPassword && this.updatePasswordRequest.confirmation) {
      this.accountService.updatePassword(this.updatePasswordRequest).subscribe({
        next: (data) => {
          this.messageService.add({severity: 'success', summary: 'Successful', detail: data, life: 3000});
          this.updatePasswordDialog = false;
          this.submitted = false;
        },
        error: (err) => {
          const errObject = JSON.parse(err.error);
          this.message = errObject.message;
          this.messageService.add({severity: 'error', summary: 'Error', detail: this.message, life: 3000});
          this.updatePasswordDialog = false;
          this.submitted = false;
        }
      });
    }
  }


}
