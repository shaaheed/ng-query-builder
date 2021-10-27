// Copyright (c) Sahidul Islam. All Rights Reserved.
// Author: https://github.com/shaaheed

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { OutputComponent } from './output.component';

@NgModule({
  declarations: [
    OutputComponent
  ],
  imports: [
    CommonModule,
    NzModalModule,
    NzButtonModule,
    PerfectScrollbarModule
  ],
  exports: [
    OutputComponent
  ]
})
export class OutputModule { }
