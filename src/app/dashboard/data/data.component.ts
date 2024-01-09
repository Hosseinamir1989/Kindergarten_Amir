import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { BackendService } from 'src/app/shared/backend.service';
import { CHILDREN_PER_PAGE } from 'src/app/shared/constants';
import { StoreService } from 'src/app/shared/store.service';
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../confirm-dialog/confirm-dialog.component";
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  public isLoading = false;

  sortColumn: string = 'name';
  sortOrder: 'asc' | 'desc' = 'asc';
  @Input() currentPage!: number;
  @Output() selectPageEvent = new EventEmitter<number>();

  @ViewChild(MatSort) sort: MatSort | undefined;




  constructor(public storeService: StoreService, private backendService: BackendService, public dialog: MatDialog) {
  }
  selectedKindergarten: string | undefined;




  ngOnInit(): void {
    this.backendService.getChildren(this.currentPage);


  }

  onKindergartenChange(newValue: string) {
    this.selectedKindergarten = newValue;

    if (newValue === "") {
      this.backendService.getChildren(this.currentPage);
    }else {
      this.backendService.getChildrenFilteredByKindergarten(this.currentPage, newValue)
          .subscribe(
              filteredChildren => {
                this.storeService.children = filteredChildren as any;
              },
              error => {
                console.log("there is an Error while fetching data ")
              }
          );
    }


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

  selectPage(i: number) {
    this.currentPage = i;
    this.selectPageEvent.emit(this.currentPage);

    if (this.selectedKindergarten) {
      this.backendService.getChildrenFilteredByKindergarten(this.currentPage, this.selectedKindergarten);
    } else {
      this.backendService.getChildren(this.currentPage);
    }
  }

  onSort(column: string) {
    if (this.sortColumn === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortOrder = 'asc';
    }
    this.sortData();
  }

  public cancelRegistration(childId: string) {
    this.isLoading = true;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(confirmed => {
       {
        this.backendService.deleteChildData(childId, this.currentPage);
        dialogRef.afterClosed().subscribe(confirmed => {
          if (confirmed) {
            this.backendService.deleteChildData(childId, this.currentPage);
          }

        });
      }
        this.isLoading= false;

    })}

  protected readonly CHILDREN_PER_PAGE = CHILDREN_PER_PAGE;


  protected readonly dateTimestampProvider = dateTimestampProvider;


  private sortData() {
    this.storeService.children = this.storeService.children.sort((a, b) => {
      let valueA = this.getValue(a, this.sortColumn).toLowerCase();
      let valueB = this.getValue(b, this.sortColumn).toLowerCase();

      if (valueA < valueB) {
        return this.sortOrder === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return this.sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });

  }

  private getValue(item: any, sortColumn: string) {
    const keys = sortColumn.split('.');
    let value = item;

    for (const key of keys) {
      if (value[key] === undefined) {
        return '';
      }
      value = value[key];
    }

    return value;
  }

}

