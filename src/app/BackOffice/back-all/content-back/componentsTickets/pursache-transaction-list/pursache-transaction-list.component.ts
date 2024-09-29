import { Component, OnInit } from '@angular/core';
import { PurchaseTransaction } from 'src/app/core/models/purchase-transaction.model';
import { PurchaseTransactionService } from 'src/app/core/services/purchase-transaction.service';

@Component({
  selector: 'app-pursache-transaction-list',
  templateUrl: './pursache-transaction-list.component.html',
  styleUrls: ['./pursache-transaction-list.component.css']
})
export class PursacheTransactionListComponent implements OnInit {
  purchaseTransactions: PurchaseTransaction[] = [];
  editingIndex: number | null = null;

  constructor(private purchaseTransactionService: PurchaseTransactionService) {}

  ngOnInit(): void {
    this.loadPurchaseTransactions();
  }

  loadPurchaseTransactions(): void {
    this.purchaseTransactionService.getAllPurchaseTransactions().subscribe((data) => {
      this.purchaseTransactions = data;
    });
  }

  addNewPurchaseTransaction(): void {
    const newPurchaseTransaction: PurchaseTransaction = {
      idPTransaction: 0,
      totalTr: 0,
      eticket: '',
      purchaseDate: new Date(), // Date actuelle comme valeur par défaut
      nbPlace: 1, // Valeur par défaut
    };
    this.purchaseTransactions.unshift(newPurchaseTransaction);
    this.editingIndex = 0;
  }

  editPurchaseTransaction(index: number): void {
    this.editingIndex = index;
  }

  cancelEdit(): void {
    this.editingIndex = null;
    if (!this.purchaseTransactions[0].idPTransaction) {
      this.purchaseTransactions.shift();
    }
    this.loadPurchaseTransactions();
  }

  onSubmit(purchaseTransaction: PurchaseTransaction, index: number): void {
    if (purchaseTransaction.idPTransaction) {
      this.purchaseTransactionService.modifyPurchaseTransaction(purchaseTransaction).subscribe(() => {
        this.editingIndex = null;
      });
    } else {
      this.purchaseTransactionService.addPurchaseTransaction(purchaseTransaction).subscribe(() => {
        this.editingIndex = null;
        this.loadPurchaseTransactions();
      });
    }
  }

  deletePurchaseTransaction(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette transaction ?')) {
      this.purchaseTransactionService.deletePurchaseTransaction(id).subscribe({
        next: () => {
          this.purchaseTransactions = this.purchaseTransactions.filter(pt => pt.idPTransaction !== id);
        },
        error: err => {
          console.error('Erreur lors de la suppression de la transaction:', err);
        }
      });
    }
  }
}