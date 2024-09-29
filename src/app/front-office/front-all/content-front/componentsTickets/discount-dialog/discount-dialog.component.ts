import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TicketCard } from 'src/app/core/models/ticket-card.model';
import { TicketCardService } from 'src/app/core/services/ticket-card.service';

@Component({
  selector: 'app-discount-dialog',
  templateUrl: './discount-dialog.component.html',
  styleUrls: ['./discount-dialog.component.css']
})
export class DiscountDialogComponent {
  discountCode: string = '';
  ticketCard: TicketCard | null = null;
  discountApplied: boolean = false;
  discountError: string = '';
  constructor(
    public dialogRef: MatDialogRef<DiscountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // Si nécessaire
    private ticketCardService: TicketCardService
  ) {}

  applyDiscount(): void {
    if (this.discountCode) {
      this.ticketCardService.applyDiscountToMostRecentTicketCard(this.data.userId, this.discountCode).subscribe({
        next: (updatedTicketCard) => {
          this.dialogRef.close({ discountApplied: true, ticketCard: updatedTicketCard });
        },
        error: (error) => {
          console.error('Error applying discount:', error);
          this.dialogRef.close({ discountApplied: false, discountError: 'Discount code does not exist or is already used' });
        }
      });
    }
  }
  
}