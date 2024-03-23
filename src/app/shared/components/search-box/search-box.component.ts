import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent {

  @Input() public placeholder: string = '';
  @Output() onValue = new EventEmitter<string>();

  @ViewChild ('txtInput')
  public valueInput!: ElementRef<HTMLInputElement>;

  emitValue():void {
    const newValueInput = this.valueInput.nativeElement.value;
    this.onValue.emit(newValueInput);
  }

  // emitValue( value: string):void {
  //   console.log({value});
  //   this.onValue.emit(value);
  // }

}
