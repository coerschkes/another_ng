import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './animations/loading-spinner/loading-spinner.component';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
  declarations: [AlertComponent, LoadingSpinnerComponent, DropdownDirective],
  imports: [CommonModule],
  exports: [
    CommonModule,
    AlertComponent,
    LoadingSpinnerComponent,
    DropdownDirective,
  ],
})
export class SharedModule {}
