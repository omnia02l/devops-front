import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Competition } from 'src/app/core/models/Competition';
import { Dancecategory } from 'src/app/core/models/Dancecategory';
import { Dancestyle } from 'src/app/core/models/Dancestyle';
import { Venue } from 'src/app/core/models/Venue';
import { CloudinaryService } from 'src/app/core/services/cloudinary-service.service';
import { CompetitionService } from 'src/app/core/services/competition.service';
import { DancecategoryandstyleService } from 'src/app/core/services/dancecategoryandstyle.service';
import { TownandvenueserviceService } from 'src/app/core/services/townandvenueservice.service';
@Component({
  selector: 'app-updatecomp',
  templateUrl: './updatecomp.component.html',
  styleUrls: ['./updatecomp.component.css']
})
export class UpdatecompComponent implements OnInit {
  competitionForm!: FormGroup;
  competitionId: number = 0;
  selectedCategoryId: number | undefined = undefined;
  selectedStyleId: number | undefined = undefined;
  venueId: number = 0;
  venues$!: Observable<Venue[]>;

  danceCategories$!: Observable<Dancecategory[]>;
  danceStyles$!: Observable<Dancestyle[]>;

  constructor(
    private formBuilder: FormBuilder,
    private competitionService: CompetitionService,
    private danceCategoryService: DancecategoryandstyleService,
    private townService: TownandvenueserviceService,
    private route: ActivatedRoute, private cloudinaryService: CloudinaryService // Injecter le service CloudinaryService ici
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadCompetitionDetails();
    this.loadDanceCategories();
    this.loadVenues();
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
      venue: ['']  // Ajoutez ce contrôle ici
    });
  }
  loadVenues(): void {
    this.venues$ = this.townService.getAllVenues();
  }
  loadCompetitionDetails(): void {
    this.route.params.subscribe(params => {
      this.competitionId = +params['id'];
      this.competitionService.getCompetitionById(this.competitionId).subscribe(
        (competition: Competition) => {
          // Préremplir les champs avec les détails de la compétition récupérée
          this.competitionForm.patchValue({
            compname: competition.compname,
            startdate: competition.startdate,
            enddate: competition.enddate,
            cdescreption: competition.cdescreption,
            nbdancers: competition.nbdancers,
            regisdeadline: competition.regisdeadline,
            feesperparticipant: competition.feesperparticipant,
            ageg: competition.ageg,
            compimage: competition.compimage
          });

          // Charger les catégories de danse
          this.selectedCategoryId = competition.dancecateg ? competition.dancecateg.idcategd : 0;
          this.loadDanceStyles(this.selectedCategoryId!);


        },
        error => {
          console.error('Error fetching competition details:', error);
        }
      );
    });
  }




  loadDanceCategories(): void {
    this.danceCategories$ = this.danceCategoryService.getAllDancecategories();
  }

  loadDanceStyles(categoryId: number): void {
    this.danceCategoryService.getStylesByCategoryId(categoryId).subscribe(
      (styles: Dancestyle[]) => {
        this.danceStyles$ = of(styles); // Mettre à jour les styles de danse observables
      },
      error => {
        console.error('Erreur lors de la récupération des styles de danse :', error);
      }
    );
  }

  onCategorySelected(event: any): void {
    console.log('Catégorie sélectionnée :', event.target.value);
    const categoryId = Number(event.target.value);
    if (!isNaN(categoryId) && categoryId !== null && categoryId !== undefined) {
      this.selectedCategoryId = categoryId;
      this.loadDanceStyles(this.selectedCategoryId);
    } else {
      this.selectedCategoryId = 0;
      this.danceStyles$ = of([]); // Vide la liste des styles
    }
  }

  onStyleSelected(event: any): void {
    const styleId = Number(event.target.value);
    if (!isNaN(styleId) && styleId !== null && styleId !== undefined) {
      this.selectedStyleId = styleId;
      console.log('ID du style sélectionné :', this.selectedStyleId);
    } else {
      this.selectedStyleId = 0;
    }
  }
  onVenueSelected(event: any): void {
    const venueId = Number(event.target.value);
    if (!isNaN(venueId) && venueId !== null && venueId !== undefined) {
      this.venueId = venueId;
      console.log('ID de la venue sélectionnée :', this.venueId);
    } else {
      this.venueId = 0;
    }
  }
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.competitionForm.patchValue({ compimage: file });
  }


  onSubmit(): void {
    if (this.competitionForm.valid && this.selectedCategoryId !== 0 && this.selectedStyleId !== 0 && this.venueId !== 0) {
      const imageFile = this.competitionForm.get('compimage')?.value;
      if (imageFile) {
        this.cloudinaryService.uploadFile(imageFile).subscribe(
          (response) => {
            this.competitionForm.patchValue({ compimage: response.secure_url });
            this.submitForm();
          },
          (error) => {
            console.error('Erreur lors de l\'upload de l\'image :', error);
          }
        );
      } else {
        this.submitForm();
      }
    } else {
      console.log('Le formulaire est invalide ou la catégorie/style/venue n\'a pas été sélectionnée');
    }
  }

  private submitForm(): void {
    const competitionData: Competition = {
      ...this.competitionForm.value,
      idcomp: this.competitionId,
      dancecateg: this.selectedCategoryId!,
      style: this.selectedStyleId!,
      venue: this.venueId
    };

    this.competitionService.updateCompetitionWithCategoryAndStyle(
      this.competitionId,
      competitionData,
      this.selectedCategoryId!,
      this.selectedStyleId!,
      this.venueId
    ).subscribe(
      (response) => {
        console.log('Compétition mise à jour avec succès :', response);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de la compétition :', error);
      }
    );
  }
}
