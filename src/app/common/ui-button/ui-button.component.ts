import { Component, Input, OnDestroy, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { debounceTime, finalize, takeUntil, tap } from "rxjs/operators";

enum ButtonState {
  Idle = 0,
  Working = 1,
  Done = 2
}

type StateClasses =
  | string
  | string[]
  | Set<string>
  | {
    [kclass: string]: any;
  };

@Component({
  selector: 'app-ui-button',
  templateUrl: './ui-button.component.html',
  styleUrls: ['./ui-button.component.css']
})
export class UIButtonComponent implements OnDestroy {
  @Input() addClicked$: Observable<any>;
  @Input() idleText: string | TemplateRef<any>;
  @Input() workingText: string | TemplateRef<any>;
  @Input() doneText: string | TemplateRef<any>;
  @Input() idleClasses: StateClasses = 'btn btn-primary';
  @Input() workingClasses: StateClasses = 'btn btn-primary';
  @Input() doneClasses: StateClasses = 'btn btn-success';
  ButtonState = ButtonState;

  currentState: ButtonState = ButtonState.Idle;
  private destroyed$ = new Subject();
  constructor() { }

  get isDisabled(): boolean {
    return this.currentState === ButtonState.Working;
  }

  get currentStateClasses(): StateClasses {
    return {
      [ButtonState.Idle]: this.idleClasses,
      [ButtonState.Working]: this.workingClasses,
      [ButtonState.Done]: this.doneClasses,
    }[this.currentState];
  }


  onClick(): void {
    if (this.currentState === ButtonState.Idle) {
      this.currentState = ButtonState.Working;
      this.addClicked$
        .pipe(
          debounceTime(100),
          tap(() => {
            this.currentState = ButtonState.Done;
          }),
          finalize(() => {
            setTimeout(() => {
              this.currentState = ButtonState.Idle;
            }, 300);
          }),
          takeUntil(this.destroyed$)
        )
        .subscribe();
    }
  }

  isText(param: string | TemplateRef<any>): boolean {
    return typeof param === "string";
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}

