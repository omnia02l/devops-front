import { Component, OnInit } from '@angular/core';
import { TheatrePlan } from 'src/app/core/models/theatre-plan.model';
import { TheatrePlanService } from 'src/app/core/services/theatre-plan.service';


@Component({
  selector: 'app-theatre-plan-list',
  templateUrl: './theatre-plan-list.component.html',
  styleUrls: ['./theatre-plan-list.component.css']
})
export class TheatrePlanListComponent implements OnInit {
  theatrePlans: TheatrePlan[] = [];
  newPlanIndex: number = -1;

  constructor(private theatrePlanService: TheatrePlanService) { }

  ngOnInit(): void {
    this.loadTheatrePlans();
  }

  loadTheatrePlans(): void {
    this.theatrePlanService.getAllTheatrePlans().subscribe(data => {
      this.theatrePlans = data;
    });
  }
  addTheatrePlan(): void {
    const newPlan = new TheatrePlan();
    newPlan.totalSeats = 0; // Initialiser numberSeat à une valeur par défaut
    newPlan.isEditing = true; // Démarrez en mode édition
    this.theatrePlans.push(newPlan); // Ajoutez le nouveau plan à la liste
    this.newPlanIndex = this.theatrePlans.length - 1; // Gardez la trace de l'index du nouvel élément
  }
  
  savePlan(plan: TheatrePlan, index: number): void {
    if (typeof plan.idPlan === 'undefined' && index === this.newPlanIndex) {
      // C'est un nouvel élément
      this.theatrePlanService.addTheatrePlan(plan).subscribe({
        next: () => {
          alert('Nouveau plan ajouté avec succès.');
          this.loadTheatrePlans(); // Rechargez la liste mise à jour
          this.newPlanIndex = -1; // Réinitialisez l'index du nouvel élément
        },
        error: error => {
          console.error('Erreur lors de l’ajout d’un nouveau plan', error);
          alert('Erreur lors de l’ajout du plan.');
        }
      });
    } else {
      // Mise à jour d'un élément existant
      this.theatrePlanService.updateTheatrePlan(plan).subscribe({
        next: () => {
          alert('Plan mis à jour avec succès.');
          plan.isEditing = false; // Quittez le mode édition
          this.loadTheatrePlans(); // Rechargez la liste mise à jour
        },
        error: error => {
          console.error('Erreur lors de la mise à jour du plan', error);
          alert('Erreur lors de la mise à jour du plan.');
        }
      });
    }
  }
  
  editPlan(index: number): void {
    this.theatrePlans[index].isEditing = true;
  }

  // edit-theatre-plan.component.ts

  deleteTheatrePlan(idPlan: number) {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce plan de théâtre ?")) {
      this.theatrePlanService.deleteTheatrePlan(idPlan).subscribe(() => {
        // Mettez à jour la liste des plans ou gérez la navigation comme nécessaire
        this.loadTheatrePlans(); // par exemple, pour recharger la liste mise à jour
      });
    }
  }
}
