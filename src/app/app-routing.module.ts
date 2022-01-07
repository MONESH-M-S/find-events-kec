import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './account/profile/edit/edit.component';
import { ProfileComponent } from './account/profile/profile.component';
import { SignupComponent } from './account/signup/signup.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'user',
    children: [
      { path: 'signup', component: SignupComponent },
      { path: ':id', component: ProfileComponent },
      { path: ':id/edit', component: EditComponent },
    ],
  },
  {
    path: 'admin',
    children: [
      { path: '', component: AdminComponent },
      { path: ':id', component: AdminHomeComponent },
    ],
  },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
