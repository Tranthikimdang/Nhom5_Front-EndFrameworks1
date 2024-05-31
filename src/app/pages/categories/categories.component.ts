import { Component ,OnInit } from '@angular/core';
import {Category} from '../entities/categories'
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
  cate : Category[] = [];
  filterValue = '';

  constructor(private router: Router) {}


  ngOnInit(): void {
    this.cate = this.categories;
  }
  navigateToDestination(): void {
    this.router.navigateByUrl('pages/categories');
  }

  filter() {
    console.log(this.filterValue);

    if (!this.filterValue) {
      this.categories = this.cate;
      return;
    }

    const filterText = this.filterValue.toLowerCase();
    console.log(filterText);

    this.categories = this.cate.filter((u) =>
      u.cateName.toLowerCase().includes(filterText)
    );
  }

  navigateToAddCate() {
    this.router.navigate(['/pages/add-cate']); 
  }

  navigateToEditCate() {
    this.router.navigate(['/pages/edit-cate']); 
  }
  
}
