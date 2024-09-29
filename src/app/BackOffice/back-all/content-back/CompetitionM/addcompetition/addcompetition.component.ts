import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Competition } from 'src/app/core/models/Competition';
import { Dancecategory } from 'src/app/core/models/Dancecategory';
import { Dancestyle } from 'src/app/core/models/Dancestyle';
import { TownandvenueserviceService } from 'src/app/core/services/townandvenueservice.service';
import { CompetitionService } from 'src/app/core/services/competition.service';
import { DancecategoryandstyleService } from 'src/app/core/services/dancecategoryandstyle.service';
import { Venue } from 'src/app/core/models/Venue';
import { CloudinaryService } from 'src/app/core/services/cloudinary-service.service';



@Component({
  selector: 'app-addcompetition',
  templateUrl: './addcompetition.component.html',
  styleUrls: ['./addcompetition.component.css']
})
export class AddcompetitionComponent implements OnInit {
  competitionForm!: FormGroup;
  danceCategories$!: Observable<Dancecategory[]>;
  danceStyles$!: Observable<Dancestyle[]>;
  selectedCategoryId: number = 0;
  selectedStyleId: number = 0;
  selectedvenueId: number = 0;
  venues$!: Observable<Venue[]>;

  constructor(
    private formBuilder: FormBuilder,
    private competitionService: CompetitionService,
    private danceCategoryService: DancecategoryandstyleService,
    private townService: TownandvenueserviceService,
    private cloudinaryService: CloudinaryService
  ) {}



  ngOnInit(): void {
    this.initForm();
    this.loadDanceCategories();
    this.loadVenues();
  }

  loadVenues(): void {
    this.venues$ = this.townService.getAllVenues();
  }

  initForm(): void {
    this.competitionForm = this.formBuilder.group({
      compname: ['', Validators.required],
      startdate: ['', Validators.required],
      enddate: ['', Validators.required],
      cdescreption: [''],
      nbdancers: ['', Validators.required],
      dancecateg: ['', Validators.required],
      style: ['', Validators.required],
      regisdeadline: ['', Validators.required],
      feesperparticipant: ['', Validators.required],
      ageg: ['', Validators.required],
      compimage: [''],
      venue: ['']
    });
  }

  loadDanceCategories(): void {
    this.danceCategories$ = this.danceCategoryService.getAllDancecategories();
  }

  onCategorySelected(event: any): void {
    const categoryId = event.target.value;
    if (categoryId) {
      this.selectedCategoryId = Number(categoryId);
      this.danceStyles$ = this.danceCategoryService.getStylesByCategoryId(this.selectedCategoryId);
    } else {
      this.selectedCategoryId = 0;
      this.danceStyles$ = of([]);
    }
  }

  onStyleSelected(event: any): void {
    const styleId = event.target.value;
    if (styleId) {
      this.selectedStyleId = Number(styleId);
    } else {
      this.selectedStyleId = 0;
    }
  }
  onVenueSelected(event: any): void {
    const venueId = Number(event.target.value);
    if (!isNaN(venueId) && venueId !== null && venueId !== undefined) {
      this. selectedvenueId = venueId;

    } else {
      this. selectedvenueId= 0;
    }
  }
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.competitionForm.patchValue({ compimage: file });
  }


  onSubmit(): void {
    console.log('Formulaire soumis');
    console.log('Valeur du formulaire :', this.competitionForm.value);
    console.log('ID de la catégorie sélectionnée :', this.selectedCategoryId);
    console.log('ID du style sélectionné :', this.selectedStyleId);

    // Uploader l'image avant de soumettre le formulaire
    const imageFile = this.competitionForm.get('compimage')?.value;
    if (imageFile) {
      this.cloudinaryService.uploadFile(imageFile).subscribe(
        (response) => {
          console.log('Image uploadée avec succès :', response);
          // Mettre à jour la valeur de l'image dans le formulaire avec l'URL de l'image uploadée
          this.competitionForm.patchValue({ compimage: response.secure_url });
          // Soumettre le formulaire une fois que l'image est uploadée
          this.submitForm();
        },
        (error) => {
          console.error('Erreur lors de l\'upload de l\'image :', error);
        }
      );
    } else {
      // Si aucun fichier n'est sélectionné, soumettre le formulaire directement
      this.submitForm();
    }
  }

  private submitForm(): void {
    console.log('Validité du formulaire :', this.competitionForm.valid);
    console.log('Validité du contrôle de catégorie :', this.competitionForm.controls['dancecateg'].valid);
    console.log('Validité du contrôle de style :', this.competitionForm.controls['style'].valid);

    if (this.competitionForm.valid && this.selectedCategoryId !== 0 && this.selectedStyleId !== 0 && this.selectedvenueId !== 0) {
      const competitionData: Competition = {
        ...this.competitionForm.value,
        dancecateg: this.selectedCategoryId,
        style: this.selectedStyleId,
      };

      this.competitionService.addCompetitionWithCategoryAndStyle(competitionData, this.selectedCategoryId,
        this.selectedStyleId,  this.selectedvenueId ).subscribe(
        (response) => {
          console.log('Compétition ajoutée avec succès :', response);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la compétition :', error);
        }
      );
    } else {
      console.log('Le formulaire est invalide ou la catégorie/style/venue n\'a pas été sélectionnée');
    }
  }
}