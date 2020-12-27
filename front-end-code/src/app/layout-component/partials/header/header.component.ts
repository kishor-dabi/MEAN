import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showBtn = true;
  constructor(private router:Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    if (this.router.url == '/login' || this.router.url == '/register') {
        this.showBtn = false;
    }else{
      this.showBtn = true;
    }

      this.router.events.subscribe((val:any) =>  {  
        if (this.router.url == '/login' || this.router.url == '/register') {
          this.showBtn = false;
        }else{
          this.showBtn = true;
        }
    })
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }

}
