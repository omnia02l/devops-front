import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import {ButtonModule} from "primeng/button";
import {ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import { HomeComponent } from './home/home.component';
import {TabMenuModule} from "primeng/tabmenu";
import { MenubarModule } from 'primeng/menubar';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    HomeComponent
  ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        ButtonModule,
        ReactiveFormsModule,
        ToastModule,
        TabMenuModule,
        MenubarModule ,
    ]
})
export class AuthModule { }
