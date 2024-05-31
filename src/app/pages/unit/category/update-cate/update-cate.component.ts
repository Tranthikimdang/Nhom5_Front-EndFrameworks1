import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-update-cate',
  templateUrl: './update-cate.component.html',
  styleUrls: ['./update-cate.component.scss']
})
export class UpdateCateComponent {
  constructor(private router: Router) {}

  cancel() {
    this.router.navigate(['/pages/categories']);
  }
}
