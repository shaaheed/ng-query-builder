import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html'
})
export class InputComponent {
  
  @Input() value: any;
  @Input() type = 'text';
  @Input() prefix: string = '';
  @Input() placeholder: string = '';
  @Input() suffix: string | TemplateRef<any> = '';
  @Input() canSuffixShow: boolean = true;
  @Input() inputStyle = {};
  @Input() disabled = false;
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() { }

  onValueChange(e: any) {
    this.onChange.emit(e);
  }

}