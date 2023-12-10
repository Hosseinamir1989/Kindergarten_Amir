import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BackendService } from 'src/app/shared/backend.service';
import { CHILDREN_PER_PAGE } from 'src/app/shared/constants';
import { StoreService } from 'src/app/shared/store.service';
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {


  @Input() currentPage!: number;
  @Output() selectPageEvent = new EventEmitter<number>();

  constructor(public storeService: StoreService, private backendService: BackendService, public dialog: MatDialog) {
  }

  public page: number = 0;

  ngOnInit(): void {
    this.backendService.getChildren(this.currentPage);
  }


  getAge(birthDate: string) {
    const today = new Date();
    const birthDateTimestamp = new Date(birthDate);
    let age = today.getFullYear() - birthDateTimestamp.getFullYear();
    const m = today.getMonth() - birthDateTimestamp.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDateTimestamp.getDate())) {
      age--;
    }
    return age;
  }

  selectPage(i: any) {
    let currentPage = i;
    this.selectPageEvent.emit(currentPage)
    this.backendService.getChildren(currentPage);
  }

  public returnAllPages() {
    return Math.ceil(this.storeService.childrenTotalCount / CHILDREN_PER_PAGE)
  }

  public cancelRegistration(childId: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
    });

    this.backendService.deleteChildData(childId, this.currentPage);
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.backendService.deleteChildData(childId, this.currentPage);
      }
    });
  }
}

