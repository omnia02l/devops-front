import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { RegistrationService } from 'src/app/core/services/registration.service';
import { RegistrationDTO } from 'src/app/core/models/RegistrationDTO';
import { ActivatedRoute } from '@angular/router'; // Importation de ActivatedRoute
import { CloudinaryService } from 'src/app/core/services/cloudinary-service.service';

@Component({
  selector: 'app-add-registration',
  templateUrl: './add-registration.component.html',
  styleUrls: ['./add-registration.component.css']
})
export class AddRegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  currentFormPart: number = 1;
  competitionId!: number; // Déclaration de l'attribut competitionId


  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService,
    private route: ActivatedRoute,
    private cloudinaryService: CloudinaryService
  ) {
    this.registrationForm = this.formBuilder.group({
      videolink: [''],
      amountpaid: [''],
      team: this.formBuilder.group({
        teamname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern('^[a-zA-Z]+$')]],
        leadername: ['', [Validators.required]],
        tdescreption: [''],
        teamtype: ['Solo', Validators.required],
        skilllevel: ['Beginner', Validators.required],
        nbdancers: ['']
      }),
      dancers: this.formBuilder.array([]),
      teamError: [''],
    });
  }

  currentDate: Date = new Date();

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.competitionId = params['id'];
    });
  }


  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.cloudinaryService.uploadFile(file).subscribe(
      (response) => {
        console.log('Image uploaded successfully:', response);
        this.registrationForm.patchValue({ videolink: response.secure_url });
      },
      (error) => {
        console.error('Error uploading image:', error);
      }
    );
  }
  onSubmit(): void {
    if (this.registrationForm.valid) {
      this.updateNbDancers(); // Update nbdancers before submitting
      const teamData = this.registrationForm.value.team || {};
      const dancersData = this.registrationForm.value.dancers || [];

      const newRegistrationDTO: RegistrationDTO = {
        registration: {
          videolink: this.registrationForm.value.videolink,

          registration_date: this.currentDate
        },
        team: {
          teamname: teamData.teamname,
          leadername: teamData.leadername,
          tdescreption: teamData.tdescreption,
          teamtype: teamData.teamtype,
          skilllevel: teamData.skilllevel,
          nbdancers: teamData.nbdancers, // Include nbdancers in the data
        },
        dancers: dancersData.map((dancer: any) => {
          return {
            dfirstname: dancer.dfirstname,
            dlastname: dancer.dlastname,
            dateofbirthd: dancer.dateofbirthd,
            dgender: dancer.dgender,
            demail: dancer.demail
          };
        })
      };

      // Call the service method to add registration with team and dancers
      this.registrationService.addRegistrationWithTeamAndDancersAssignComp(newRegistrationDTO, this.competitionId).subscribe(
        (response) => {
          console.log('Registration added successfully:', response);
          // Display success message or perform other actions if necessary
          // Reset the form after submission
          this.registrationForm.reset();
          this.currentFormPart = 1;
        },
        (error) => {
          console.error('Error adding registration:', error);
          this.registrationForm.controls['teamError'].setValue('Since we strive for gender equality, we should have at least a man or a woman in a team.');
        }
      );
    }
  }

  nextFormPart(): void {
    this.currentFormPart++;
  }

  returnToFormPart(partNumber: number): void {
    this.currentFormPart = partNumber;
  }

  addDancer(): void {
    const dancerGroup = this.formBuilder.group({
      dfirstname: ['', [Validators.required]],
      dlastname: ['', [Validators.required]],
      dateofbirthd: ['', [Validators.required]],
      dgender: ['', [Validators.required]],
      demail: ['', [Validators.required, Validators.email]]
    });
    this.dancers.push(dancerGroup);
  }

  removeDancerField(index: number): void {
    this.dancers.removeAt(index);
  }

  get dancers(): FormArray {
    return this.registrationForm.get('dancers') as FormArray;
  }

  updateNbDancers(): void {
    const nbDancers = this.dancers.length;
    this.registrationForm.get('team')!.patchValue({
      nbdancers: nbDancers
    });
  }
}
