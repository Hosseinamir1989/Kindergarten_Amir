// button.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  imports: [MatButtonModule],
})
export class ButtonComponent {
  @Input() set formVisibility(value: string) {
    this._formVisibility = value;
    this.buttonText = value === "visible" ? "Formular schließen" : "Formular öffnen";
  }
  get formVisibility(): string {
    return this._formVisibility;
  }
  private _formVisibility!: string;

  @Output() onOpenForm = new EventEmitter<void>();

  public buttonText!: string;

  openFormButtonClicked() {
    this.onOpenForm.emit();
  }
}
