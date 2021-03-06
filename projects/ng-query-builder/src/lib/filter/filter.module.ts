// Copyright (c) Sahidul Islam. All Rights Reserved.
// Author: https://github.com/shaaheed

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { DatePickerModule } from '../controls/date-picker/date-picker.module';
import { InputModule } from '../controls/input/input.module';
import { SelectModule } from '../controls/select/select.module';
import { SwitchModule } from '../controls/switch/switch.module';
import { FilterComponent } from './filter.component';

@NgModule({
  declarations: [
    FilterComponent
  ],
  imports: [
    CommonModule,
    NzModalModule,
    SelectModule,
    InputModule,
    DatePickerModule,
    NzButtonModule,
    SwitchModule
  ],
  exports: [
    FilterComponent
  ]
})
export class FilterModule { }
