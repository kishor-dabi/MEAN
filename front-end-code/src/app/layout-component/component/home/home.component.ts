import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user_type = null;

  constructor( private api:ApiService) { }

  ngOnInit() {
    this.user_type = localStorage.getItem('user_type')
  }

}
