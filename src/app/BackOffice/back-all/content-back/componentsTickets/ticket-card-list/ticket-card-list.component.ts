import { Component, OnInit } from '@angular/core';
import { TicketCard } from 'src/app/core/models/ticket-card.model';
import { TicketCardService } from 'src/app/core/services/ticket-card.service';

@Component({
  selector: 'app-ticket-card-list',
  templateUrl: './ticket-card-list.component.html',
  styleUrls: ['./ticket-card-list.component.css']
})
export class TicketCardListComponent implements OnInit{
  ticketCards: TicketCard[] = [];
  editingIndex: number | null = null;

  constructor(private ticketCardService: TicketCardService) {}

  ngOnInit(): void {
    this.loadTicketCards();
  }

  loadTicketCards(): void {
    this.ticketCardService.getAllTicketCards().subscribe((data) => {
      this.ticketCards = data;
    });
  }

  addNewTicketCard(): void {
    const newTicketCard: TicketCard = {
      idCardT: 0,
      total: 0,
      // Initialiser d'autres propriétés si nécessaire
    };
    this.ticketCards.unshift(newTicketCard);
    this.editingIndex = 0;
  }

  editTicketCard(index: number): void {
    this.editingIndex = index;
  }

  cancelEdit(): void {
    this.editingIndex = null;
    if (!this.ticketCards[0].idCardT) {
      this.ticketCards.shift();
    }
    this.loadTicketCards();
  }

  onSubmit(ticketCard: TicketCard, index: number): void {
    if (ticketCard.idCardT) {
      this.ticketCardService.modifyTicketCard(ticketCard).subscribe(() => {
        this.editingIndex = null;
      });
    } else {
      this.ticketCardService.addTicketCard(ticketCard).subscribe(() => {
        this.editingIndex = null;
        this.loadTicketCards();
      });
    }
  }

  deleteTicketCard(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette carte de ticket ?')) {
      this.ticketCardService.deleteTicketCard(id).subscribe({
        next: () => {
          this.ticketCards = this.ticketCards.filter(ticketCard => ticketCard.idCardT !== id);
        },
        error: err => {
          console.error('Erreur lors de la suppression de la carte de ticket:', err);
        }
      });
    }
  }
}