import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {AuthService} from "../../../../../core/services/auth.service";
import {SignupRequest} from "../../../../../core/models/signupRequest";

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
  providers: [MessageService]
})
export class ForgotpasswordComponent implements OnInit {

  form: FormGroup;
  message!:string;
  signupRequest:SignupRequest = {};
  @ViewChild('emailAddress') emailAddressElementRef!: ElementRef;

  constructor(private formBuilder: FormBuilder, private router: Router, private messageService: MessageService,
              private authService : AuthService) {
    this.form = this.formBuilder.group({
      emailAddress: this.formBuilder.control(null, [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.emailAddressElementRef.nativeElement.focus();
  }

  forgotPassword() {
    this.authService.forgotPassword(this.form.value.emailAddress).subscribe({
      next:(data) => {
        this.messageService.add({ severity: 'success', summary: 'Successful',
          detail: data, life: 3000 });
        this.form.reset();
      },error:(err) => {
        const errObject = JSON.parse(err.error);
        this.message = errObject.message;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.message , life: 3000 });
      }
    })
  }
}
