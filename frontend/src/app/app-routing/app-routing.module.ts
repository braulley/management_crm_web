import { AdminComponent } from './../admin/admin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';



const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent }
];

/*{ path: '', redirectTo: 'admin', pathMatch: 'full' },
      { path: 'auth/login', component: LoginComponent },*/

@NgModule({
  imports: [
    RouterModule.forRoot( routes, {useHash: true} )
  ],
  declarations: [],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
