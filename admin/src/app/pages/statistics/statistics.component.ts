import { Component, OnInit } from '@angular/core';
import { Category } from '../entities/categories';
import { CategoryService } from 'app/@core/services/apis/category.service';
import { ProductService } from 'app/@core/services/apis/product.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  categories: Category[] = [];
  statisticsData: any[] = [];
  filteredStatisticsData: any[] = []; // Dữ liệu sau khi lọc
  searchTerm: string = ''; // Biến để lưu giá trị tìm kiếm

  constructor(private categoryService: CategoryService, private productService: ProductService) { }

  ngOnInit(): void {
    this.categoryService.getCategory().subscribe(
      response => {
        console.log('API Response:', response);
        if (response && response.categories && response.categories.length > 0) {
          this.categories = response.categories;
          this.calculateStatistics();
        } else {
          console.error('API Response does not contain a valid list of categories:', response);
        }
      },
      error => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  calculateStatistics(): void {
    this.categories.forEach(category => {
      this.productService.getProductsByCategory(category.cateId).subscribe(
        response => {
          console.log(`Products API Response for category ${category.cateId}:`, response);
          const products = response.data.products; // Adjusted to match the structure of the API response
          if (Array.isArray(products)) {
            const quantity = products.length;
            const highestPrice = Math.max(...products.map(product => product.productPrice));
            const lowestPrice = Math.min(...products.map(product => product.productPrice));
            const averagePrice = products.reduce((sum, product) => sum + product.productPrice, 0) / quantity;

            const statsItem = {
              categoryCode: category.cateId,
              categoryName: category.cateName,
              quantity,
              highestPrice,
              lowestPrice,
              averagePrice
            };

            this.statisticsData.push(statsItem);
            this.filteredStatisticsData = this.statisticsData; // Khởi tạo dữ liệu lọc ban đầu
          } else {
            console.error(`API response for category ${category.cateId} does not contain a valid product list:`, response);
          }
        },
        error => {
          console.error(`Error fetching products for category ${category.cateId}:`, error);
        }
      );
    });
  }

  filterData(): void {
    this.filteredStatisticsData = this.statisticsData.filter(item =>
      item.categoryName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
