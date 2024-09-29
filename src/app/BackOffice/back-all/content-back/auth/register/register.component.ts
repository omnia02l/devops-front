import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MessageService} from "primeng/api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../../core/services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  @ViewChild('userNameRef') usernameElementRef!: ElementRef;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private messageService: MessageService) {
    this.form = this.formBuilder.group({
      username: this.formBuilder.control(null, [Validators.required]),
      firstName: this.formBuilder.control(null, [Validators.required]),
      lastName: this.formBuilder.control(null, [Validators.required]),
      email: this.formBuilder.control(null, [Validators.required]),
      phoneNumber: this.formBuilder.control(null, [Validators.required ,Validators.pattern(/^\d{8}$/)]),
      role:this.formBuilder.control(null,[Validators.required,Validators.pattern(/^(jury|dancer|school|registred_user|coach|admin)$/)]),
      password: this.formBuilder.control(null, [Validators.required])
    })
  }


  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.usernameElementRef.nativeElement.focus();
  }

  createAccount() {
    this.authService.createAccount(this.form.value).subscribe({
      next:(data) => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: data.message , life: 3000 });
        this.form.reset();
      },error:(err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message , life: 3000 });
      }
    })
  }
}
