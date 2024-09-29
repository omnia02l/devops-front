import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { TicketCard } from 'src/app/core/models/ticket-card.model';
import { AccountService } from 'src/app/core/services/account.service';
import { TicketCardService } from 'src/app/core/services/ticket-card.service';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-purchase-transaction',
  templateUrl: './purchase-transaction.component.html',
  styleUrls: ['./purchase-transaction.component.css']
})
export class PurchaseTransactionComponent implements OnInit, AfterViewInit {
  ticketCardDetails: TicketCard | null = null;
  userId: number | null = null;
  userName: string | null = null;

  @ViewChildren('ticketElement') ticketElements!: QueryList<ElementRef>;

  constructor(
    private ticketCardService: TicketCardService,
    private accountService: AccountService,
    private changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getPrincipal();
  }

  getPrincipal(): void {
    this.accountService.getPrincipal().subscribe({
      next: (data) => {
        this.userId = data.id;
        this.userName = data.firsName;
        this.loadTicketCardDetails(this.userId);
      },
      error: (err) => {
        console.error('Error fetching user details:', err);
      }
    });
  }
  ngAfterViewInit(): void {
    this.changeDetector.detectChanges();
  }

  private loadTicketCardDetails(userId: number): void {
    this.ticketCardService.getLastTicketCardDetails(userId).subscribe({
      next: (data) => {
        this.ticketCardDetails = data;
      },
      error: (err) => {
        console.error('Failed to fetch ticket card details', err);
      }
    });
  }
  downloadAsPDF(ticketIndex: number): void {
    const element = this.ticketElements.toArray()[ticketIndex].nativeElement;
    
    html2canvas(element, { scale: 3 }).then(canvas => {
      const data = canvas.toDataURL('image/png');
      const doc = new jsPDF('p', 'mm', 'a4');
      const imgHeight = canvas.height * 208 / canvas.width;
      doc.addImage(data, 'PNG', 0, 0, 208, imgHeight);
      doc.save(`ticket-${ticketIndex}.pdf`);
    }).catch(err => {
      console.error('Error generating PDF', err);
    });
}  
}