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
        console.log('API Response:', response.data);
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
    this.statisticsData = []; // Xóa dữ liệu cũ trước khi thêm dữ liệu mới
  
    this.categories.forEach(category => {
      this.productService.getProductsByCategory(category.cateId).subscribe(
        (response: any) => {
          console.log(`Products API Response for category ${category.cateId}:`, response);
          const products = response.data.products;
  
          if (Array.isArray(products) && products.length > 0) {
            // Tính tổng số lượng sản phẩm trong danh mục
            const totalQuantity = products.reduce((sum, product) => sum + product.quantity, 0);
            
            // Tính giá cao nhất, thấp nhất của danh mục
            const highestPrice = Math.max(...products.map(product => product.productPrice));
            const lowestPrice = Math.min(...products.map(product => product.productPrice));
  
            // Tính giá trung bình của danh mục
            const averagePrice = products.reduce((sum, product) => sum + product.productPrice, 0) / products.length;
  
            // Làm tròn và định dạng số liệu
            const formattedTotalQuantity = totalQuantity.toLocaleString();
            const formattedHighestPrice = Math.round(highestPrice).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
            const formattedLowestPrice = Math.round(lowestPrice).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
            const formattedAveragePrice = Math.round(averagePrice).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  
            const statsItem = {
categoryCode: category.cateId,
              categoryName: category.cateName,
              quantity: formattedTotalQuantity, // Sử dụng tổng số lượng sản phẩm đã định dạng
              highestPrice: formattedHighestPrice, // Sử dụng giá cao nhất đã định dạng và làm tròn
              lowestPrice: formattedLowestPrice, // Sử dụng giá thấp nhất đã định dạng và làm tròn
              averagePrice: formattedAveragePrice // Sử dụng giá trung bình đã định dạng và làm tròn
            };
  
            this.statisticsData.push(statsItem);
            this.filteredStatisticsData = this.statisticsData; // Khởi tạo dữ liệu lọc ban đầu
          } else {
            console.error(`API response for category ${category.cateId} does not contain a valid product list:`, response);
          }
        },
        (error: any) => {
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
