import { Component, OnInit } from '@angular/core';
import { TicketCardService } from 'src/app/core/services/ticket-card.service';
import { Ticket } from 'src/app/core/models/ticket.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketCard } from 'src/app/core/models/ticket-card.model';
import { Price } from 'src/app/core/models/price.model';
import { TrancheAge } from 'src/app/core/models/tranche-age.model';
import { TicketService } from 'src/app/core/services/ticket.service';
import { AccountService } from 'src/app/core/services/account.service';
import { MatDialog } from '@angular/material/dialog';
import { DiscountDialogComponent } from '../discount-dialog/discount-dialog.component';
import { Location } from '@angular/common';
@Component({
  selector: 'app-ticket-card',
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.css']
})
export class TicketCardComponent implements OnInit {
  price: Price;
  ticketCard: TicketCard | null = null;
  TrancheAge = TrancheAge;
  userId: number | null = null;
  discountCode: string = '';
  discountApplied: boolean = false;
  discountError: string = '';
  competitionId!: number;
  constructor(
    private route: ActivatedRoute,
    public ticketCardService: TicketCardService,
    public ticketService: TicketService,
    private accountService: AccountService,
    private router: Router,
    private dialog: MatDialog,
    private location: Location
    

  ) {this.price = new Price();}

  ngOnInit(): void {
   
    this.route.params.subscribe(params => {
      this.userId = +params['userId'];
      this.competitionId = +params['competitionId'];
  
      console.log('User ID:', this.userId);
      console.log('Competition ID:', this.competitionId);
  
      // Make sure the IDs are numbers and not NaN
      if (!isNaN(this.userId) && !isNaN(this.competitionId)) {
        this.refreshTicketCard();
      } else {
        console.error('Invalid ID(s):', {
          userId: this.userId,
          competitionId: this.competitionId
        });
        // Handle the error case here
      }
    });
  }

    
  goBack(): void {
    this.location.back();  // Correct usage of the Location service's back method
  }
    getPrincipal() {
      this.accountService.getPrincipal().subscribe({
        next: (data) => {
          this.userId = data.id; 
          console.log(this.userId);
        },
        error: (err) => {
          console.error('Error fetching user details:', err);
        }
      });
    }

    getTicketCardByUserIdAndCompetitionAndDate(userId: number, competitionId: number): void {
      this.ticketCardService.getTicketCardByUserIdAndCompetitionAndDate(userId,this.competitionId).subscribe({
        next: (ticketCard) => {
          this.ticketCard = ticketCard;
          
        },
        error: (error) => {
          console.error('Error fetching TicketCard', error);
        }
      });
    }
    refreshTicketCard(): void {
      const userId = +this.route.snapshot.params['userId'];
      if (userId) {
        this.getTicketCardByUserIdAndCompetitionAndDate(userId,this.competitionId);
      } else {
        console.error('No userId provided');
      }
    }
    changeAgeGroup(ticketId: number, trancheAge: TrancheAge) {
      const trancheAgeValue = TrancheAge[trancheAge];
      this.ticketService.updateTicketAgeGroup(ticketId, trancheAgeValue).subscribe(() => {
        this.refreshTicketCard(); 
        // Ou utilisez window.location.reload(); pour rafraîchir la page entière
      });
    }
  
    
  

    openDiscountDialog(): void {
      const dialogRef = this.dialog.open(DiscountDialogComponent, {
        width: '300px',
        data: { userId: this.userId }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (result.discountApplied) {
            this.discountApplied = result.discountApplied;
            this.ticketCard = result.ticketCard;
            // Peut-être voulez-vous rafraîchir les détails ici
            this.refreshTicketCard();
          } else {
            this.discountError = result.discountError;
          }
        }
      });
    }
    goToPurchaseTransaction(): void {
      this.router.navigate(['/home/purchase-transaction']).then(success => {
        console.log('Navigation success:', success);
      }).catch(err => {
        console.error('Navigation error:', err);
      });
    }
        
}
  


