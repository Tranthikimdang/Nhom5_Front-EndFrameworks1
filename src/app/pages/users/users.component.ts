import { Component , OnInit } from '@angular/core';
import {User} from './user'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  constructor() { }

  ngOnInit(){
    this.renderUsers();
  }

  users : User[] =[
    {
      "userId": 1,
      "userName": "Dang Dinh Khiem",
      "email": "khiemddpc05680@fpt.edu.vn",
      "address" : "Bac Lieu"
    },
    {
      "userId": 2,
      "userName": "Dang Dang Dang",
      "email": "dang@fpt.edu.vn",
      "address" : "Can Tho"
    },
    {
      "userId": 3,
      "userName": "Phi Phi Phi",
      "email": "phi@fpt.edu.vn",
      "address" : "Can Tho"
    },
    {
      "userId": 4,
      "userName": "Ai Ai Ai",
      "email": "ai@fpt.edu.vn",
      "address" : "Can Tho"
    }
  ]
  userHtml: string = ''; 

  renderUsers() {

  }
}
