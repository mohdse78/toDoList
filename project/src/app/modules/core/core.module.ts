import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberDirective } from './directives/number.directive';



@NgModule({
  declarations: [
    NumberDirective
  ],
  exports: [
    NumberDirective
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
