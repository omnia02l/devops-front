import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {AuthService} from "../../../../../core/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit{

  form: FormGroup;
  @ViewChild('userNameRef') usernameElementRef!: ElementRef;
  constructor(private formBuilder: FormBuilder, private authService: AuthService,private router: Router, private messageService:MessageService) {
    this.form = this.formBuilder.group({
      userName: this.formBuilder.control(null, [Validators.required]),
      password: this.formBuilder.control(null, [Validators.required])
    })
  }
  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.usernameElementRef.nativeElement.focus();
  }

  login() {
    this.authService.login(this.form.value.userName, this.form.value.password).subscribe({
      next:(data) => {
        this.authService.setToLocalStorage('accessToken' , data.accessToken);
        this.authService.setToLocalStorage('role' , data.role);
        if(data.role === 'admin'){
          this.router.navigate(['admin']);
        }else {
          this.router.navigate(['home']);
        }

      },
      error:(err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Bad credentials' , life: 3000 });
      }
    })
  }
}
