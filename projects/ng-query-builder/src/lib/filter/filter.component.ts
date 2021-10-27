// Copyright (c) Sahidul Islam. All Rights Reserved.
// Author: https://github.com/shaaheed

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QueryBuilderService } from '../builder/builder.service';
import { Field } from '../models/fields/field';
import { Filter } from '../models/filter';
import { Operator } from '../models/operator';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  @Input() show = false;
  @Input() filter: Filter | undefined;
  @Input() mode: string | undefined;
  @Output() onOpen = new EventEmitter();
  @Output() onApply = new EventEmitter();

  fields: any[] = [];
  operators: any[] = [];

  bodyStyle = { padding: '0' };

  constructor(
    private builderService: QueryBuilderService
  ) { }

  ngOnInit() { }

  open(filter?: Filter, field?: string, operator?: string, value?: string) {
    if (!this.filter && filter) {
      this.filter = filter;
    }
    if (!this.filter) {
      this.filter = new Filter(this.builderService.getFields());
    }
    this.fields = this.filter.fields.map(x => {
      return { label: x.name, value: x.value }
    });

    if (field) {
      this.onFieldChange(field);
    }
    if (operator) {
      this.onOperatorChange(operator);
    }
    if (value) {
      this.onValueChange(value);
    }
    if (field || operator || value) {
      this.mode = 'edit';
    }
    else {
      this.mode = 'add';
    }

    this.show = true;
    this.onOpen.emit();
  }

  onFieldChange(e: any) {
    if (e && this.filter) {
      const field: Field = this.filter.fields.filter(x => x.value == e)[0];
      if (field) {
        this.filter.field = field;
        this.filter.operators = this.builderService.getOperators(field);
        this.operators = this.filter.operators.map(x => {
          return { label: x.name, value: x.value }
        });
      }
    }
  }

  onOperatorChange(e: any) {
    if (e && this.filter) {
      const operator: Operator = this.filter.operators.filter(x => x.value == e)[0];
      if (operator) {
        this.filter.operator = operator;
      }
    }
  }

  onValueChange(e: any) {
    if (this.filter) {
      if (e instanceof Date) {
        e = `${e.getDate()}/${e.getMonth() + 1}/${e.getFullYear()}`;
      }
      this.filter.value = e;
    }
  }

  submit() {
    this.onApply.emit();
    this.show = false;
  }

  handleCancel() {
    this.show = false;
  }
}