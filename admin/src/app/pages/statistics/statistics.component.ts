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
  categories: Category[] = []; // Khởi tạo mảng categories trống
  statisticsData: any[] = []; // Đối tượng để lưu trữ dữ liệu thống kê

  constructor(private categoryService: CategoryService, private productService: ProductService) { }

  ngOnInit(): void {
    // Lấy danh sách các danh mục
    this.categoryService.getCategory().subscribe(response => {
      console.log('API Response:', response); // Kiểm tra phản hồi từ API
  
      // Kiểm tra xem phản hồi có chứa dữ liệu hợp lệ không
      if (response && response.categories && response.categories.length > 0) {
        // Gán trực tiếp mảng danh mục từ phản hồi API cho biến categories
        this.categories = response.categories;
        // Sau khi có danh sách danh mục, tiến hành tính toán dữ liệu thống kê
        this.calculateStatistics();
      } else {
        console.error('API Response does not contain a valid list of categories:', response);
      }
    });
  }
  
  
  calculateStatistics(): void {
    this.categories.forEach(category => {
      this.productService.getProductsByCategory(category.cateId).subscribe(
        response => {
          console.log('Products API Response:', response); // Log API response
          const products = response.data; // Assuming API returns { data: [...] }
          if (Array.isArray(products)) {
            const quantity = products.length;
            const highestPrice = Math.max(...products.map(product => product.productPrice));
            const lowestPrice = Math.min(...products.map(product => product.productPrice));
            const averagePrice = products.reduce((sum, product) => sum + product.productPrice, 0) / quantity;

            const statsItem = {
              categoryName: category.cateName,
              quantity,
              highestPrice,
              lowestPrice,
              averagePrice
            };

            this.statisticsData.push(statsItem);
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
  
  
  
}
