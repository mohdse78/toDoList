import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-behzi-product',
  templateUrl: './behzi-product.component.html',
  styleUrls: ['./behzi-product.component.scss'],
  providers: [MessageService]

})
export class BehziProductComponent implements OnInit {

  number: number = 0;
  price: number = 0;
  derham: number = 0;
  newDerham: number = 0;
  percent: number = 0;
  maliat: number = 0;
  totalPrice: number = 0;
  myForm: any;
  todayDerhamPrice: number = 0;
  barbari: number = 0;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      number: '',
      derham: '',
      maliat: '',
      percent: '',
      barbari: '',
      todayDerhamPrice: ''
    })
  }

  calculate() {
    if(this.myForm.valid){
    this.number = this.myForm.value.number;
    this.derham = this.myForm.value.derham;
    this.newDerham = this.number * this.derham;
    this.todayDerhamPrice = this.myForm.value.todayDerhamPrice;
    this.maliat = this.myForm.value.maliat;
    this.percent = this.myForm.value.percent;
    this.barbari = this.myForm.value.barbari;
    this.totalPrice = ((((this.number * this.derham) + (this.maliat / 100) * (this.number * this.derham))) * this.todayDerhamPrice) - (this.percent / 100) * ((((this.number * this.derham) + (this.maliat / 100) * (this.number * this.derham))) * this.todayDerhamPrice) + (this.newDerham * this.barbari);
    }else {
      this.messageService.add({
        severity: 'error',
        summary:'خطا',
        detail:'اطلاعات را به درستی وارد کنید'
      })
    }
  }


}
