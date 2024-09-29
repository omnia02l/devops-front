import { Component, OnInit } from '@angular/core';
import { Row } from 'src/app/core/models/row.model';
import { VenuePlan } from 'src/app/core/models/venue-plan.model';
import { VenuePlanService } from 'src/app/core/services/venue-plan.service';
import { MatDialog } from '@angular/material/dialog';
import { VenuePlanDialogComponent } from '../venue-plan-dialog/venue-plan-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-venue-plan-list',
  templateUrl: './venue-plan-list.component.html',
  styleUrls: ['./venue-plan-list.component.css']
})
export class VenuePlanListComponent implements OnInit {
  venuePlans: VenuePlan[] = [];
  constructor(private venuePlanService: VenuePlanService,public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadVenuePlans();
  }
  loadVenuePlans(): void {
    this.venuePlanService.getAllVenuePlans().subscribe((data) => {
      this.venuePlans = data;
    });
  }
  deleteVenuePlan(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce plan de lieu ?')) {
      this.venuePlanService.deleteVenuePlan(id).subscribe({
        next: () => {
          this.venuePlans = this.venuePlans.filter(vp => vp.idPlan !== id);
        },
        error: err => {
          console.error('Erreur lors de la suppression du plan de lieu:', err);
        }
      });
    }
  }
// In your VenuePlanListComponent
openVenuePlanDialog(venuePlan?: VenuePlan): void {
  const dialogRef = this.dialog.open(VenuePlanDialogComponent, {
    width: '500px',
    data: venuePlan ? venuePlan : new VenuePlan() // Pass existing or new venue plan
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result?.event === 'success') {
      this.snackBar.open('Plan de salle ajouté avec succès!', 'Fermer', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      this.loadVenuePlans(); // Reload the venue plans after a successful add
    } else if (result?.event === 'update') {
      this.snackBar.open('Plan de salle mis à jour avec succès!', 'Fermer', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      this.loadVenuePlans(); // Reload the venue plans after a successful update
    }
  });
}

}