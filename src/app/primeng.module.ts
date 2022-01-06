import { NgModule } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';

@NgModule({
  imports: [TooltipModule, SidebarModule, ToastModule],
  exports: [TooltipModule, SidebarModule, ToastModule],
})
export class PrimengModule {}
