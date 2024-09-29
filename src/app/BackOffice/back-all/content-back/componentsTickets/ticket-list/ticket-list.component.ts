import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/core/services/ticket.service';
import { Ticket } from 'src/app/core/models/ticket.model';
import { TypeTicket } from 'src/app/core/models/type-ticket.model';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];
  TypeTicketEnum = Object.values(TypeTicket);
  editingIndex: number | null = null;

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.ticketService.getAllTickets().subscribe((data) => {
      this.tickets = data;
    });
  }

  addNewTicket(): void {
    const newTicket: Ticket = {
      idTicket: 0,
      refTicket: 'Nouveau',
      disponibility: true,
      expireDate: new Date(), // Date actuelle comme valeur par défaut
      typeTicket: TypeTicket.CLASSIQUE // Choisissez une valeur par défaut
    };
    this.tickets.unshift(newTicket);
    this.editingIndex = 0;
  }

  editTicket(index: number): void {
    this.editingIndex = index;
  }

  cancelEdit(): void {
    this.editingIndex = null;
    if (!this.tickets[0].idTicket) {
      this.tickets.shift();
    }
    this.loadTickets();
  }

  onSubmit(ticket: Ticket, index: number): void {
    if (ticket.idTicket) {
      this.ticketService.modifyTicket(ticket).subscribe(() => {
        this.editingIndex = null;
      });
    } else {
      this.ticketService.generateTicket().subscribe(() => {
        this.editingIndex = null;
        this.loadTickets();
      });
    }
  }

  deleteTicket(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce ticket ?')) {
      this.ticketService.deleteTicket(id).subscribe({
        next: () => {
          this.tickets = this.tickets.filter(ticket => ticket.idTicket !== id);
        },
        error: err => {
          console.error('Erreur lors de la suppression du ticket:', err);
        }
      });
    }
  }
}
