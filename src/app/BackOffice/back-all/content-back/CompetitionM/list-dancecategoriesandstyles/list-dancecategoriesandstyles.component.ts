import { Component, OnInit } from '@angular/core';
import { Dancecategory } from 'src/app/core/models/Dancecategory';
import { Dancestyle } from 'src/app/core/models/Dancestyle';
import { DancecategoryandstyleService } from 'src/app/core/services/dancecategoryandstyle.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-dancecategoriesandstyles',
  templateUrl: './list-dancecategoriesandstyles.component.html',
  styleUrls: ['./list-dancecategoriesandstyles.component.css']
})
export class ListDancecategoriesandstylesComponent implements OnInit {
  danceCategories: Dancecategory[] = [];

  constructor(private danceCategoryService: DancecategoryandstyleService,
    private router: Router ) { }

  ngOnInit(): void {
    this.getAllDanceCategories();
  }

  getAllDanceCategories(): void {
    this.danceCategoryService.getAllDancecategories()
      .subscribe(categories => {
        this.danceCategories = categories.map(category => ({
          ...category,
          showStyles: false // Ajout de la propriété showStyles pour gérer l'état d'affichage des styles
        }));
      });
  }

  toggleStyles(category: Dancecategory): void {
    category.showStyles = !category.showStyles; // Bascule l'état d'affichage des styles
  }

  deleteCategory(id: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.danceCategoryService.deleteDancecategory(id).subscribe(() => {
        // Recharger les catégories après la suppression
        this.getAllDanceCategories();
      });
    }
  }

  removeStyle(categoryId: number, styleId: number): void {
    if (confirm('Are you sure you want to remove this style from the category?')) {
      this.danceCategoryService.removeDanceStyleFromCategory(categoryId, styleId)
        .subscribe((updatedCategory: Dancecategory) => {
          // Mettre à jour les catégories avec la catégorie mise à jour
          const index = this.danceCategories.findIndex(cat => cat.idcategd === updatedCategory.idcategd);
          if (index !== -1) {
            this.danceCategories[index] = updatedCategory;
          }
        });
    }
  }
  updateCategory(id: number): void {
    // Rediriger vers le formulaire de mise à jour avec l'ID de la catégorie en tant que paramètre
    this.router.navigate(['/admin/update-dancecategory', id]);
  }
}
