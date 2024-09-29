import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Town } from 'src/app/core/models/Town';
import { TownsandVenuesDTO } from 'src/app/core/models/TownsandVenuesDTO';
import { TownandvenueserviceService } from 'src/app/core/services/townandvenueservice.service';

@Component({
  selector: 'app-addtownwithvenues',
  templateUrl: './addtownwithvenues.component.html',
  styleUrls: ['./addtownwithvenues.component.css']
})
export class AddtownwithvenuesComponent implements OnInit {
  townForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private townService: TownandvenueserviceService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.townForm = this.formBuilder.group({
      townname: ['', Validators.required],
      country: ['', Validators.required],
      population: ['', Validators.required],
      landmarks: [''],
      venues: this.formBuilder.array([])
    });
    this.addVenueField(); // Ajouter un champ de venue par défaut
  }

  get venues(): FormArray {
    return this.townForm.get('venues') as FormArray;
  }

  addVenueField(): void {
    const venueFormGroup = this.formBuilder.group({
      vname: ['', Validators.required],
      vaddress: ['', Validators.required],
      capacity: ['', Validators.required],
      contact_person: [''],
      vemail: ['', Validators.email],
      phone: [''],
      facilities: ['']
    });
    this.venues.push(venueFormGroup);
  }

  removeVenueField(index: number): void {
    this.venues.removeAt(index);
  }

  submitForm(): void {
    if (this.townForm.valid) {
      const formData = this.townForm.value;
      const townWithVenues: TownsandVenuesDTO = {
        town: {
          townname: formData.townname,
          country: formData.country,
          population: formData.population,
          landmarks: formData.landmarks,
          venues: []
        },
        venues: formData.venues.map((venue: any) => ({
          ...venue,
          town: null, // La référence à la ville sera définie côté serveur
          competitions: []
        }))
      };

      console.log(townWithVenues); // Ajoutez cette ligne pour vérifier les données

      this.townService.addTownWithVenues(townWithVenues)
        .subscribe(
          (response) => {
            console.log('Ville et lieux ajoutés avec succès : ', response);
            this.successMessage = 'Town with venues added successfully.';
            // Réinitialiser le formulaire ou naviguer vers une autre page
          },
          (error) => {
            console.error('Erreur lors de l\'ajout de la ville et des lieux : ', error);
            this.errorMessage = 'An error occurred while adding the town and venues.';
            // Gérer l'erreur ici
          }
        );
    }
  }
}