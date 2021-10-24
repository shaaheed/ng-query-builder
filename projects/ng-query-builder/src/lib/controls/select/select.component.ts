// Copyright (c) Sahidul Islam. All Rights Reserved.
// Author: https://github.com/shaaheed

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html'
})
export class SelectComponent {

  @Input() value: any;
  @Input() loading: boolean = false;
  @Input() placeholder: string = 'Select';
  @Input() disabled = false;
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() items: any[] = [];

  ngOnInit() { }

  onValueChange(e: any) {
    this.onChange.emit(e);
    console.log(e);
  }
}