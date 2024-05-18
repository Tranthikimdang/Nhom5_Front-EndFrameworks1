import { Component ,OnInit } from '@angular/core';
import {Category} from './categories'
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  constructor() { }

  ngOnInit(){
    this.renderCategories();
  }

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
  cateoryHtml: string = ''; 

  renderCategories() {

  }

}
