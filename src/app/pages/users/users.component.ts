import { Component , OnInit } from '@angular/core';
import {User} from '../entities/user'
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

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

  user : User[] = [];
  filterValue = '';

  constructor(private router: Router) {}


  ngOnInit(): void {
    this.user = this.users;
  }
  navigateToDestination(): void {
    this.router.navigateByUrl('pages/users');
  }

  filter() {
    console.log(this.filterValue);

    if (!this.filterValue) {
      this.users = this.user;
      return;
    }

    const filterText = this.filterValue.toLowerCase();
    console.log(filterText);

    this.users = this.user.filter((u) =>
      u.userName.toLowerCase().includes(filterText)
    );
  }

  navigateToAddUser() {
    this.router.navigate(['/pages/add-user']); 
  }

  navigateToEditUser() {
    this.router.navigate(['/pages/edit-user']); 
  }
}
