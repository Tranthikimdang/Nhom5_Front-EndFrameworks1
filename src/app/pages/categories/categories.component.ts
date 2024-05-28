import { Component ,OnInit } from '@angular/core';
import {Category} from './categories'
import { Router } from '@angular/router';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories : Category[] =[
    {
      "cateId": 1,
      "cateName": "Sữa",
      
    },
    {
      "cateId": 2,
      "cateName": "Bánh mì",
    },
    {
      "cateId": 3,
      "cateName": "Mì",
    },
    {
      "cateId": 4,
      "cateName": "Nước ngọt",
    }
  ]
  
  cate: Category[] = [];
  filterValue = '';

  constructor(
    private router: Router,
    ) {}

  ngOnInit(): void {
    this.cate = this.categories;
  }
  navigateToDestination(): void {
    this.router.navigateByUrl('pages/categories');
  }

  filter() {
    // Kiểm tra filter trống
    if (!this.filterValue) {
      this.categories = this.cate;      // Hiển thị lại danh sách gốc
      return;
    }

    // Lọc sản phẩm
    const filterText = this.filterValue.toLowerCase();
    console.log(filterText);

    this.categories = this.cate.filter((ca) =>
      ca.cateName.toLowerCase().includes(filterText)
    );
  }

}
