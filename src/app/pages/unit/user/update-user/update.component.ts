import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateUserComponent {
  
  constructor(private router: Router) {}

  cancel() {
    this.router.navigate(['/pages/users']);
  }
}
