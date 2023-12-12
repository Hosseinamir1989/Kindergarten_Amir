import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, Validators, AbstractControl, ValidatorFn} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';




declare var bootstrap: any;
@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit {
  public addChildForm: any;
  @Input() currentPage!: number;
  public modalMessage: string = '';
  constructor(private formbuilder: FormBuilder, public dialog: MatDialog, public storeService: StoreService, public backendService: BackendService) { }

  ngOnInit(): void {
    this.addChildForm = this.formbuilder.group({
      name: ['', [Validators.required, this.lettersOnlyValidator()]], // Moved to sync validators
      kindergardenId: ['', Validators.required],
      birthDate: [null, [Validators.required, this.pastDateValidator()]] // Moved to sync validators
    });
  }

  onSubmit(): void {
    if (this.addChildForm.valid) {
      this.backendService.addChildData(this.addChildForm.value, this.currentPage);
      this.setModalMessage('Registration successful!');
      this.showModal();
      this.addChildForm.reset
    } else {
      // Handle the invalid form if necessary
    }
  }


  setModalMessage(message: string): void {
    this.modalMessage = message;
  }

  showModal(): void {
    const modalElement = document.getElementById('bootstrapModal');
    if (modalElement) {
      const modalBody = modalElement.querySelector('.modal-body');
      if (modalBody) {
        modalBody.textContent = this.modalMessage; // Set the message in the modal body
      }
      const bsModal = new bootstrap.Modal(modalElement, {});
      bsModal.show();
    }
  }



// Validator for Name Field
  private lettersOnlyValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const valid = /^[a-zA-Z ]*$/.test(control.value);
      return valid ? null : { 'invalidCharacters': { value: control.value }};
    };
  }


  private pastDateValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Ignore time part
      const date = new Date(control.value);
      return date <= today ? null : { 'futureDate': { value: control.value }};
    };
  }

}
