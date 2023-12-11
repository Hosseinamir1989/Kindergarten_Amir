// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataComponent } from './dashboard/data/data.component';
import { AddDataComponent } from './dashboard/add-data/add-data.component';
import { HeaderComponent } from './header/header.component';
import { PaginationPipe } from './dashboard/data/pagination.pipe';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {ButtonComponent} from "./dashboard/button/button.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { AboutPageComponent } from './about-page/about-page.component';





@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddDataComponent,
    DataComponent,
    HeaderComponent,
    PaginationPipe,
    ConfirmDialogComponent,
    ErrorDialogComponent,
    AboutPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatButtonModule,
    ButtonComponent,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatDialogModule,
    MatMenuModule,
    MatButtonToggleModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
