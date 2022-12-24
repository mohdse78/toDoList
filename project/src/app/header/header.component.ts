import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  responsive: boolean= false;
  constructor() { }

  ngOnInit(): void {
  }

  showName(){
    this.responsive = !this.responsive
  }

}
