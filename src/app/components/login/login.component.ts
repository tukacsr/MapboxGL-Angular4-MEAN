import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  templateUrl: './login.component.html',
  styles: [`
    form {
      padding: 10px;
      width: 80%;
      max-width: 400px;
      margin: 10px auto
    }
  `]
})

export class LoginComponent implements OnInit {
  myName:string

  constructor(private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['map'])
    }
  }

  toMap() {
    localStorage.setItem('currentUser', this.myName)
    this.router.navigate(['map'])
  }
}
