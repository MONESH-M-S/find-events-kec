import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './account/profile/edit/edit.component';
import { ProfileComponent } from './account/profile/profile.component';
import { RegistrationDetailComponent } from './account/profile/registration-detail/registration-detail.component';
import { SignupComponent } from './account/signup/signup.component';
import { AddEventComponent } from './admin/admin-home/add-event/add-event.component';
import { EditEventComponent } from './admin/admin-home/admin-added-events/edit-event/edit-event.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { ShowAllAdminComponent } from './admin/admin-home/show-all-admin/show-all-admin.component';
import { ShowMessageComponent } from './admin/admin-home/show-message/show-message.component';
import { AdminComponent } from './admin/admin.component';
import { ContactComponent } from './contact/contact.component';
import { EventMainComponent } from './event/event-main/event-main.component';
import { ShowRegistrationComponent } from './event/event-main/show-registration/show-registration.component';
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
      { path: ':id/register-detail', component: RegistrationDetailComponent },
    ],
  },
  {
    path: 'admin',
    children: [
      { path: '', component: AdminComponent },
      { path: ':id', component: AdminHomeComponent },
      { path: ':id/add/event', component: AddEventComponent },
      { path: ':id/edit/event/:aid', component: EditEventComponent },
      { path: ':id/show/admins', component: ShowAllAdminComponent },
      { path: ':id/show/messages', component: ShowMessageComponent },
    ],
  },
  {
    path: 'event',
    children: [
      { path: '', component: EventComponent },
      { path: ':id', component: EventMainComponent },
      { path: ':id/admin/:aid', component: EventMainComponent },
      {
        path: ':id/admin/:aid/show-registration',
        component: ShowRegistrationComponent,
      },
    ],
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
