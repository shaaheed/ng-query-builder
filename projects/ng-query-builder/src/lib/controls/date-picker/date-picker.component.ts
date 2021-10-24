// Copyright (c) Sahidul Islam. All Rights Reserved.
// Author: https://github.com/shaaheed

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html'
})
export class DatePickerComponent {

  @Input() set value(v: any) {
    if (v) {
      if (v.constructor.name == 'String') {
        const parts = (v as string).split('/');
        v = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
      }
    }
    this._value = v;
  }

  get value() {
    return this._value;
  }

  @Input() placeholder: string = '';
  @Input() inputStyle = {};
  @Input() disabled = false;
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() dateFormat: string = 'dd-MM-yyyy';

  private _value: any;

  ngOnInit() { }

  onValueChange(e: any) {
    this.onChange.emit(this.value);
  }

}