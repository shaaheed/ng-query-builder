// Copyright (c) Sahidul Islam. All Rights Reserved.
// Author: https://github.com/shaaheed

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent {

  @Input() show = false;
  @Input() value: any;
  @Input() type?: string;
  bodyStyle = { padding: '0' };

  constructor() { }

  ngOnInit() { }

  open(value: any, type?: string) {
    this.value = value;
    this.type = type;
    this.show = true;
  }

  submit() {
    this.show = false;
  }

  handleCancel() {
    this.show = false;
  }
}