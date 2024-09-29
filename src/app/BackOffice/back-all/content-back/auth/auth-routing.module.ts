import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ForgotpasswordComponent} from "./forgotpassword/forgotpassword.component";
import {ResetpasswordComponent} from "./resetpassword/resetpassword.component";
import {RegisterComponent} from "./register/register.component";

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'forgot-password',component:ForgotpasswordComponent},
  {path:'reset-password',component:ResetpasswordComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
