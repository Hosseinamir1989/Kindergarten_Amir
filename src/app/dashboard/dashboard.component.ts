import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public currentPage: number = 1;
  public isFormVisible: boolean = false;
  public formVisibility: string = "hidden";

  public receiveMessage(newPageCount: number): void {
    this.currentPage = newPageCount;
  }


  public toggleAddDataVisibility(): void {
    this.isFormVisible = !this.isFormVisible;
  }



}
