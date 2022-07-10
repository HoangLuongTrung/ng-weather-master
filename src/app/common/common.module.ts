import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIButtonComponent } from './ui-button/ui-button.component';
import { SelectAutoCompleteComponent } from './ui-select-auto-complete/ui-select-auto-complete.component';
import { HighlightPipe } from 'app/pipe/high-light';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    UIButtonComponent,
    SelectAutoCompleteComponent,
    HighlightPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule
  ],
  exports: [
    UIButtonComponent,
    SelectAutoCompleteComponent
  ]
})
export class CommonsModule { }
