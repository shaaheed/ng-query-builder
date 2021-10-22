import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { SelectComponent } from './select.component';

@NgModule({
  declarations: [
    SelectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzSelectModule
  ],
  exports: [
    SelectComponent
  ]
})
export class SelectModule { }
