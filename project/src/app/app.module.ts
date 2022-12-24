import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {InlineSVGModule} from 'ng-inline-svg';
import {AppRoutingModule, ArrayOfComponents} from './app-routing.module';
import {AppComponent} from "./app.component";
import {HeaderComponent} from './header/header.component';
import {ReactiveFormsModule} from '@angular/forms';
import {DialogModule} from "primeng/dialog";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TableModule} from "primeng/table";
import {DragDropModule} from 'primeng/dragdrop';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ButtonModule} from "primeng/button";
import {OrderListModule} from 'primeng/orderlist';
import {DropdownModule} from "primeng/dropdown";
import {NgPersianDatepickerModule} from 'ng-persian-datepicker';
import {ToastModule} from 'primeng/toast';
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputTextModule} from "primeng/inputtext";
import {MatFormFieldModule} from '@angular/material/form-field';



@NgModule({
  declarations: [
    AppComponent,
    ArrayOfComponents,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InlineSVGModule.forRoot(),
    ToastModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DialogModule,
    TableModule,
    DragDropModule,
    ConfirmPopupModule,
    ButtonModule,
    OrderListModule,
    DropdownModule,
    NgPersianDatepickerModule,
    InputTextareaModule,
    InputTextModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
