import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  title = 'store';
  product: { id: number, name: string, price: number, picture: string }[] = [
    {id: 1, name: 'Full belt shirt', price: 150, picture: 'assets/pixes/shirts.jpg'},
    {id: 2, name: 'Full belt shirt', price: 140, picture: 'assets/pixes/pants.jpg'},
    {id: 3, name: 'Full belt shirt', price: 120, picture: 'assets/pixes/tshirt.PNG'},

  ]
  constructor() { }

  ngOnInit(): void {
  }

}
