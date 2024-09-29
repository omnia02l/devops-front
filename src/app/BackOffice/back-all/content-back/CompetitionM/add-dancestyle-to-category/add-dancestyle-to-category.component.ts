import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DancecategoryandstyleService } from 'src/app/core/services/dancecategoryandstyle.service';
import { Router } from '@angular/router';

import { Dancecategory } from 'src/app/core/models/Dancecategory';
import { Dancestyle } from 'src/app/core/models/Dancestyle';

@Component({
  selector: 'app-add-dancestyle-to-category',
  templateUrl: './add-dancestyle-to-category.component.html',
  styleUrls: ['./add-dancestyle-to-category.component.css']
})
export class AddDancestyleToCategoryComponent {
  danceStyleName: string = '';
  danceStyleDescription: string = '';
  categoryId: number = 0;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private dancecategoryService: DancecategoryandstyleService,
    private router: Router
  ) {
    this.route.params.subscribe(params => {
      this.categoryId = params['id'];
    });
  }

  addDanceStyleToCategory(): void {
    const dancestyle: Dancestyle = {
      styledname: this.danceStyleName,
      styledesc: this.danceStyleDescription
      // Vous pouvez ajouter d'autres propriétés du style de danse ici
    };

    this.dancecategoryService.addDanceStyleToCategory(this.categoryId, dancestyle)
      .subscribe((response: Dancecategory) => {
        this.successMessage = 'Dance style added successfully.';
        this.router.navigate(['/admin/list-dancecategoryandstyle']);
        // Vous pouvez rediriger vers une autre page si nécessaire
      }, (error) => {
        this.errorMessage = 'An error occurred while adding the dance style.';

        // Gérer l'erreur
      });
  }
}
