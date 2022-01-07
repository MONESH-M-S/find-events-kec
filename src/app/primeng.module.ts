import { NgModule } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  imports: [
    TooltipModule,
    SidebarModule,
    ToastModule,
    CardModule,
    DropdownModule,
    InputMaskModule,
    InputTextModule,
    ButtonModule,
    ProgressSpinnerModule,
  ],
  exports: [
    TooltipModule,
    SidebarModule,
    ToastModule,
    CardModule,
    DropdownModule,
    InputMaskModule,
    InputTextModule,
    ButtonModule,
    ProgressSpinnerModule,
  ],
})
export class PrimengModule {}
