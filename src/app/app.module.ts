import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimengModule } from './primeng.module';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CarouselComponent } from './home/carousel/carousel.component';
import { CategoryComponent } from './home/category/category.component';
import { AccountComponent } from './account/account.component';
import { SignupComponent } from './account/signup/signup.component';
import { ProfileComponent } from './account/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { DeleteComponent } from './account/profile/delete/delete.component';
import { EditComponent } from './account/profile/edit/edit.component';
import { AdminComponent } from './admin/admin.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AddAdminDialogComponent } from './admin/admin-home/add-admin-dialog/add-admin-dialog.component';
import { AdminAddedEventsComponent } from './admin/admin-home/admin-added-events/admin-added-events.component';
import { ShowAllAdminComponent } from './admin/admin-home/show-all-admin/show-all-admin.component';
import { DeleteAdminDialogComponent } from './admin/admin-home/show-all-admin/delete-admin-dialog/delete-admin-dialog.component';
import { EditAdminDialogComponent } from './admin/admin-home/show-all-admin/edit-admin-dialog/edit-admin-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CarouselComponent,
    CategoryComponent,
    AccountComponent,
    SignupComponent,
    ProfileComponent,
    DeleteComponent,
    EditComponent,
    AdminComponent,
    AdminHomeComponent,
    AddAdminDialogComponent,
    AdminAddedEventsComponent,
    ShowAllAdminComponent,
    DeleteAdminDialogComponent,
    EditAdminDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PrimengModule,
    HttpClientModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
