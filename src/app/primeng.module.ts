import { NgModule } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
  imports: [TooltipModule, SidebarModule],
  exports: [TooltipModule, SidebarModule],
})
export class PrimengModule {}
