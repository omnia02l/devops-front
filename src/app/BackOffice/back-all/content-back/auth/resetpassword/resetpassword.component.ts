import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {AuthService} from "../../../../../core/services/auth.service";

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css'],
  providers: [MessageService]
})
export class ResetpasswordComponent implements OnInit{

  form: FormGroup;
  message!:string;
  @ViewChild('verificationCode') verificationCodeElementRef!: ElementRef;

  constructor(private formBuilder: FormBuilder, private router: Router, private messageService: MessageService,
              private authService : AuthService) {
    this.form = this.formBuilder.group({
      verificationCode: this.formBuilder.control(null, [Validators.required]),
      newPassword: this.formBuilder.control(null, [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.verificationCodeElementRef.nativeElement.focus();
  }

  resetPassword() {
    this.authService.resetPassword(this.form.value.verificationCode, this.form.value.newPassword).subscribe({
      next:(data) => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: data , life: 3000 });
        this.form.reset();
      },
      error:(err) => {
        const errObject = JSON.parse(err.error);
        this.message = errObject.message;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.message , life: 3000 });
      }
    })
  }
}
