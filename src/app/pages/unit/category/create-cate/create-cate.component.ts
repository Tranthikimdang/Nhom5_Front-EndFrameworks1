import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-cate',
  templateUrl: './create-cate.component.html',
  styleUrls: ['./create-cate.component.scss']
})
export class CreateCateComponent {

  constructor(private router: Router) {}

  cancel() {
    this.router.navigate(['/pages/categories']);
  }
}
