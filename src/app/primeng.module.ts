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
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';

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
    InputSwitchModule,
    TableModule,
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
    InputSwitchModule,
    TableModule,
  ],
})
export class PrimengModule {}
