import { Component, OnInit } from '@angular/core';
import { TicketScanner } from 'src/app/core/models/ticket-scanner.model';
import { TicketScannerService } from 'src/app/core/services/ticket-scanner.service';

@Component({
  selector: 'app-ticket-scanner-list',
  templateUrl: './ticket-scanner-list.component.html',
  styleUrls: ['./ticket-scanner-list.component.css']
})
export class TicketScannerListComponent implements OnInit {
  ticketScanners: TicketScanner[] = [];
  editingIndex: number | null = null;

  constructor(private ticketScannerService: TicketScannerService) {}

  ngOnInit(): void {
    this.loadTicketScanners();
  }

  loadTicketScanners(): void {
    this.ticketScannerService.getAllTicketScanners().subscribe((data) => {
      this.ticketScanners = data;
    });
  }

  addNewTicketScanner(): void {
    const newTicketScanner: TicketScanner = {
      idScanner: 0,
      agentName: '',
      // Initialiser d'autres propriétés si nécessaire
    };
    this.ticketScanners.unshift(newTicketScanner);
    this.editingIndex = 0;
  }

  editTicketScanner(index: number): void {
    this.editingIndex = index;
  }

  cancelEdit(): void {
    this.editingIndex = null;
    if (!this.ticketScanners[0].idScanner) {
      this.ticketScanners.shift();
    }
    this.loadTicketScanners();
  }

  onSubmit(ticketScanner: TicketScanner, index: number): void {
    if (ticketScanner.idScanner) {
      this.ticketScannerService.modifyTicketScanner(ticketScanner).subscribe(() => {
        this.editingIndex = null;
      });
    } else {
      this.ticketScannerService.addTicketScanner(ticketScanner).subscribe(() => {
        this.editingIndex = null;
        this.loadTicketScanners();
      });
    }
  }

  deleteTicketScanner(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce scanner de ticket ?')) {
      this.ticketScannerService.deleteTicketScanner(id).subscribe({
        next: () => {
          this.ticketScanners = this.ticketScanners.filter(ts => ts.idScanner !== id);
        },
        error: err => {
          console.error('Erreur lors de la suppression du scanner de ticket:', err);
        }
      });
    }
  }
}