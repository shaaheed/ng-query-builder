// Copyright (c) Sahidul Islam. All Rights Reserved.
// Author: https://github.com/shaaheed

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { FilterModule } from '../filter/filter.module';
import { InputModule } from '../controls/input/input.module';
import { QueryBuilderComponent } from './builder.component';
import { QueryBuilderService } from './builder.service';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [
    QueryBuilderComponent
  ],
  imports: [
    CommonModule,
    InputModule,
    NzButtonModule,
    NzPopoverModule,
    NzToolTipModule,
    NzTagModule,
    FilterModule,
    NzIconModule
  ],
  exports: [
    QueryBuilderComponent
  ],
  providers: [QueryBuilderService]
})
export class QueryBuilderModule { }
