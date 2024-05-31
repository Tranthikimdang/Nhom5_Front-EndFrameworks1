import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateUserComponent {
  
  constructor(private router: Router) {}

  cancel() {
    this.router.navigate(['/pages/users']);
  }
}
