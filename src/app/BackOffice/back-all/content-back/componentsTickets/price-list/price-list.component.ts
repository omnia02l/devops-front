import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PriceService } from 'src/app/core/services/price.service';
import { Price } from 'src/app/core/models/price.model';
import { TrancheAge } from 'src/app/core/models/tranche-age.model';
import { TypeTicket } from 'src/app/core/models/type-ticket.model';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent implements OnInit {
  prices: Price[] = [];
  TrancheAgeEnum = Object.values(TrancheAge);
  TypeTicketEnum = Object.values(TypeTicket);
  editingIndex: number | null = null;

  constructor(
    private priceService: PriceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPrices();
  }

  loadPrices(): void {
    this.priceService.getAllPrices().subscribe((data) => {
      this.prices = data;
    });
  }

  addNewPrice(): void {
    const newPrice: Price = {
      idPrice:0,
      price: 0,
      trancheAge: TrancheAge.ADULT, // Choisissez une valeur par défaut
      typeTicket: TypeTicket.CLASSIQUE // Choisissez une valeur par défaut
    };
    this.prices.unshift(newPrice); // Ajoutez le nouveau prix au début du tableau
    this.editingIndex = 0; // Mettre la nouvelle ligne en mode édition
  }

  editPrice(index: number): void {
    this.editingIndex = index;
  }

  cancelEdit(): void {
    this.editingIndex = null;
    if (!this.prices[0].idPrice) {
      this.prices.shift(); // Supprimez la nouvelle ligne si elle n'a pas été enregistrée
    }
    this.loadPrices(); // Recharge les prix pour annuler les modifications non sauvegardées
  }

  onSubmit(price: Price, index: number): void {
    if (price.idPrice) {
      this.priceService.modifyPrice(price).subscribe(() => {
        this.editingIndex = null;
      });
    } else {
      this.priceService.addPrice(price).subscribe(() => {
        this.editingIndex = null;
        this.loadPrices(); // Recharge les prix après l'ajout
      });
    }
  }
  deletePrice(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce prix ?')) {
      this.priceService.deletePrice(id).subscribe({
        next: () => {
          // Actualiser la liste des prix
          this.prices = this.prices.filter(price => price.idPrice !== id);
        },
        error: err => {
          console.error('Une erreur est survenue lors de la suppression du prix :', err);
        }
      });
    }
  }
  
}
