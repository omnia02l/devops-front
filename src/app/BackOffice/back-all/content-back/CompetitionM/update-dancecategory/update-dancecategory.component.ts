import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DancecategoryandstyleService } from 'src/app/core/services/dancecategoryandstyle.service';
import { Dancecategory } from 'src/app/core/models/Dancecategory';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-dancecategory',
  templateUrl: './update-dancecategory.component.html',
  styleUrls: ['./update-dancecategory.component.css']
})
export class UpdateDancecategoryComponent implements OnInit {
  danceCategoryForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  categoryId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private danceCategoryService: DancecategoryandstyleService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryId = params['id'];
    });
    this.initializeForm();
    this.loadCategory();
  }

  initializeForm(): void {
    this.danceCategoryForm = this.formBuilder.group({
      categdname: ['', Validators.required],
      categdesc: ['', Validators.required],
      dancestyles: this.formBuilder.array([]),
    });
  }

  get dancestyles(): FormArray {
    return this.danceCategoryForm.get('dancestyles') as FormArray;
  }

  addStyleField(): void {
    const styleFormGroup = this.formBuilder.group({
      styledname: ['', Validators.required],
      styledesc: ['', Validators.required]
    });
    this.dancestyles.push(styleFormGroup);
  }

  removeStyleField(index: number): void {
    this.dancestyles.removeAt(index);
  }

  loadCategory(): void {
    this.danceCategoryService.getDancecategory(this.categoryId).subscribe((category: Dancecategory) => {
      this.danceCategoryForm.patchValue({
        categdname: category.categdname,
        categdesc: category.categdesc
      });
      category.dancestyles!.forEach(style => {
        this.addStyleField();
        const lastIndex = this.dancestyles.length - 1;
        this.dancestyles.at(lastIndex).patchValue({
          styledname: style.styledname,
          styledesc: style.styledesc
        });
      });
    });
  }

  submitForm(): void {
    if (this.danceCategoryForm.valid) {
      const formData = this.danceCategoryForm.value;
      const dancecategory: Dancecategory = {
        idcategd: this.categoryId,
        categdname: formData.categdname,
        categdesc: formData.categdesc,
        dancestyles: formData.dancestyles,
        showStyles: false // Ajoutez cette ligne pour initialiser la propriété showStyles
      };
      this.danceCategoryService.updateDancecategory(this.categoryId, dancecategory)
        .subscribe((response) => {
          console.log('Dance category updated successfully: ', response);
          this.successMessage = 'Dance category updated successfully.';
          this.router.navigate(['/admin/list-dancecategoryandstyle']);
        }, (error) => {
          console.error('Error updating dance category: ', error);
          this.errorMessage = 'An error occurred while updating the dance category.';
        });
    }
  }
}
