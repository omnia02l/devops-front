// registration-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Registration } from 'src/app/core/models/Registration';
import { RegistrationService } from 'src/app/core/services/registration.service';

@Component({
  selector: 'app-registration-detail',
  templateUrl: './registration-detail.component.html',
  styleUrls: ['./registration-detail.component.css']
})
export class RegistrationDetailComponent implements OnInit {
  registrationId!: number;
  registration!: Registration;

  constructor(
    private route: ActivatedRoute,
    private registrationService: RegistrationService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['registrationId'] && !isNaN(+params['registrationId'])) {
        this.registrationId = +params['registrationId'];
        this.loadRegistrationDetails();
      } else {
        console.error('Invalid or missing registrationId:', params['registrationId']);
      }
    });
  }

  loadRegistrationDetails(): void {
    this.registrationService.getRegistration(this.registrationId).subscribe(registration => {
      this.registration = registration;
    });
  }

  approveRegistration(): void {
    if (this.registration) {
      this.registration.statusreg = 'Approved';
      this.registration.approved_date = new Date();
      this.registration.rejected_date  = null as any;
      this.updateRegistration();
     // Check if idreg is defined before calling the function
     if (this.registration.idreg !== undefined) {
      // Call the function to send the approval email
      this.registrationService.sendEmailsToDancersInTeam(this.registrationId, 'Registration acceptance', 'Your registration has been approved.').subscribe(() => {
        console.log('Approval email sent successfully');
      }, error => {
        console.error('Error sending approval email:', error);
      });
    }
    }
  }

  rejectRegistration(): void {
    if (this.registration) {
      this.registration.statusreg = 'Rejected';
      this.registration.rejected_date = new Date();
      this.registration.approved_date = null as any;
      this.updateRegistration();

    // Check if idreg is defined before calling the function
    if (this.registration.idreg !== undefined) {
      // Call the function to send the rejection email
      this.registrationService.sendEmailsToDancersInTeam(this.registrationId, 'Registration refusal', 'Your registration has been refused.').subscribe(() => {
        console.log('Rejection email sent successfully');
      }, error => {
        console.error('Error sending rejection email:', error);
      });
    }

    }
  }

  private updateRegistration(): void {
    if (this.registration && this.registration.idreg) {
      // Créer une copie de la registration avec seulement les champs nécessaires
      const updatedRegistration: Registration = {
        idreg: this.registration.idreg,
        statusreg: this.registration.statusreg,
        approved_date: this.registration.approved_date,
        rejected_date: this.registration.rejected_date
      };

      this.registrationService.updateRegistration(updatedRegistration).subscribe(updatedRegistration => {
        // Gérer toute logique supplémentaire après la mise à jour de la registration
        console.log('Registration updated successfully:', updatedRegistration);
        // Recharger les détails de la registration après la mise à jour
        this.loadRegistrationDetails();
      });
    }
  }
}
