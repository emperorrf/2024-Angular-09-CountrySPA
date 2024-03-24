import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription?: Subscription;

  @Input() public placeholder: string = '';
  @Input() public initialValue: string = '';
  @Output() onValue = new EventEmitter<string>();
  @Output() onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
    .pipe(
      debounceTime(1000) //un segundo
      )
      .subscribe ( value => {
        console.log('debouncer value', value);
        this.onDebounce.emit(value);
      })
    }

    ngOnDestroy(): void {
      this.debouncerSubscription?.unsubscribe();
    }

    @ViewChild ('txtInput')
    public valueInput!: ElementRef<HTMLInputElement>;

    // emitValue():void {
      //   const newValueInput = this.valueInput.nativeElement.value;
      //   this.onValue.emit(newValueInput);
      // }

      onKeyPress (){
        const searchTerm = this.valueInput.nativeElement.value;
        this.debouncer.next( searchTerm );
      }

      // emitValue( value: string):void {
        //   console.log({value});
        //   this.onValue.emit(value);
        // }

      }
