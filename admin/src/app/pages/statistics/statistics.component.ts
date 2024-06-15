import { Component, OnInit } from '@angular/core';
import { Category } from '../entities/categories';
import { CategoryService } from 'app/@core/services/apis/category.service';
import { StatictiscService } from 'app/@core/services/apis/statictisc.service';

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

  constructor(private categoryService: CategoryService, private statictiscService: StatictiscService) { }

  ngOnInit(): void {
    this.categoryService.getCategory().subscribe(
      response => {
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
    this.statisticsData = []; // Clear previous data
    this.filteredStatisticsData = []; // Clear filtered data as well
  
    this.categories.forEach(category => {
      this.statictiscService.getProductsByCategory(category.cateId).subscribe(
        (response: any) => {
          const products = response.data.products;
          
          if (Array.isArray(products) && products.length > 0) {
            // Calculate total quantity of products in the category
            const totalQuantity = products.reduce((sum, product) => sum + product.quantity, 0);
            
            // Calculate highest and lowest prices within the category
            const productPrices = products.map(product => Number(product.productPrice));
            const highestPrice = Math.max(...productPrices);
            const lowestPrice = Math.min(...productPrices);
  
            // Calculate average price of products in the category
            const averagePrice = products.length > 0 ? products.reduce((sum, product) => sum + Number(product.productPrice), 0) / products.length : 0;
  
            // Format the calculated values
            const formattedTotalQuantity = totalQuantity.toLocaleString();
            const formattedHighestPrice = !Number.isNaN(highestPrice) ? Math.round(highestPrice).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : 'N/A';
            const formattedLowestPrice = !Number.isNaN(lowestPrice) ? Math.round(lowestPrice).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : 'N/A';
            const formattedAveragePrice = !Number.isNaN(averagePrice) ? Math.round(averagePrice).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : 'N/A';
  
            // Create statistics item for the category
            const statsItem = {
              categoryCode: category.cateId,
              categoryName: category.cateName,
              quantity: formattedTotalQuantity,
              highestPrice: formattedHighestPrice,
              lowestPrice: formattedLowestPrice,
              averagePrice: formattedAveragePrice
            };
  
            // Push statsItem to statisticsData
            this.statisticsData.push(statsItem);
            
            // Update filteredStatisticsData with initial data
            this.filteredStatisticsData = [...this.statisticsData]; // Use spread operator to clone the array
          } else {
            console.error("Danh mục không có sản phẩm");
            // Optionally handle or log this error further
          }
        },
        (error: any) => {
          console.error(`Error fetching products for category ${category.cateId}:`, error);
          // Optionally handle or log this error further
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
