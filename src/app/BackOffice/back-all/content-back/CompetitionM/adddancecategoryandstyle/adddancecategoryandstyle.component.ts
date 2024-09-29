import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DancecategoryandstyleService } from 'src/app/core/services/dancecategoryandstyle.service';
import { Dancecategory} from 'src/app/core/models/Dancecategory';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adddancecategoryandstyle',
  templateUrl: './adddancecategoryandstyle.component.html',
  styleUrls: ['./adddancecategoryandstyle.component.css']
})
export class AdddancecategoryandstyleComponent implements OnInit {
  danceCategoryForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  


  constructor(private formBuilder: FormBuilder, private danceCategoryService: DancecategoryandstyleService,
    private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.danceCategoryForm = this.formBuilder.group({
      categdname: ['', Validators.required],
      categdesc: ['', Validators.required],
      dancestyles: this.formBuilder.array([]),
    });
    this.addStyleField(); // Ajouter un champ de style par défaut
  }

  get dancestyles(): FormArray {
    return this.danceCategoryForm.get('dancestyles') as FormArray;
  }

  addStyleField(): void {
    const styleFormGroup = this.formBuilder.group({
      styledname: ['', Validators.required],
      styledesc: ['', Validators.required],
      sadddate: new Date() // Date actuelle pour sadddate
    });
    this.dancestyles.push(styleFormGroup);
  }

  removeStyleField(index: number): void {
    this.dancestyles.removeAt(index);
  }

  submitForm(): void {
    if (this.danceCategoryForm.valid) {
      const formData = this.danceCategoryForm.value;
      const dancecategory: Dancecategory = {
        categdname: formData.categdname,
        categdesc: formData.categdesc,
        cadddate: new Date(), // Date actuelle
        dancestyles: formData.dancestyles,
        showStyles: false // Ajoutez cette ligne pour initialiser la propriété showStyles
      };
      this.danceCategoryService.addDanceCategory(dancecategory)
        .subscribe((response) => {
          console.log('Catégorie de danse ajoutée avec succès : ', response);
          this.successMessage = 'Dance category with style added successfully.';
          this.router.navigate(['/admin/list-dancecategoryandstyle']);
          // Réinitialiser le formulaire ou naviguer vers une autre page
        }, (error) => {
          console.error('Erreur lors de l\'ajout de la catégorie de danse : ', error);
          this.errorMessage = 'An error occurred while adding the dance category.';
          // Gérer l'erreur ici
        });
    }
  }
}
