import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './account/profile/edit/edit.component';
import { ProfileComponent } from './account/profile/profile.component';
import { SignupComponent } from './account/signup/signup.component';
import { AddEventComponent } from './admin/admin-home/add-event/add-event.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { ShowAllAdminComponent } from './admin/admin-home/show-all-admin/show-all-admin.component';
import { AdminComponent } from './admin/admin.component';
import { EventMainComponent } from './event/event-main/event-main.component';
import { EventComponent } from './event/event.component';
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
      { path: ':id/add/event', component: AddEventComponent },
      { path: ':id/show/admins', component: ShowAllAdminComponent },
    ],
  },
  {
    path: 'event',
    children: [
      { path: '', component: EventComponent },
      { path: ':id', component: EventMainComponent },
    ],
  },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
