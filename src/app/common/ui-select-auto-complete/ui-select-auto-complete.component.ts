import { ElementRef, EventEmitter, Output, Component, Input } from '@angular/core';

@Component({
  selector: 'app-ui-select-auto-complete',
  templateUrl: './ui-select-auto-complete.component.html',
  styleUrls: ['./ui-select-auto-complete.component.css'],
  host: {
    "(document:click)": "onClick($event)",
  },
})
export class SelectAutoCompleteComponent {
  @Input() countryList: any[] = [];
  @Output() selectionChange = new EventEmitter<any>();
  value = "";
  isShow: boolean;
  private selectedItem: any;

  constructor(private ele: ElementRef) { }
  get listItem(): any[] {
    return this.countryList.filter((e) =>
      e.name.toLocaleLowerCase().includes(this.value?.toLocaleLowerCase())
    );
  }

  onFocus(): void {
    this.isShow = true;
    this.value = "";
  }

  onSelectedItem(country: any): void {
    this.isShow = false;
    this.selectedItem = country;
    this.selectionChange.emit(country);
    this.value = country.name;
  }

  onClick(event: Event): void {
    if (!this.ele.nativeElement.contains(event.target)) {
      this.isShow = false;
      this.value = this.selectedItem?.name || "";
    }
  }
}

