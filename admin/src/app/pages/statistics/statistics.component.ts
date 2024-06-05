import { Component } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent {
  Statistics_Revenue = [
  ];
  constructor() {}
  ngOnInit(): void {}


  // categories: Category[];
  // statisticsData: any[]; // Đối tượng để lưu trữ dữ liệu thống kê

  // constructor(private categoryService: CategoryService, private productService: ProductService) { }

  // ngOnInit(): void {
  //   // Lấy danh sách các danh mục
  //   this.categoryService.getCategories().subscribe(categories => {
  //     this.categories = categories;
  //     // Sau khi có danh sách danh mục, tiến hành tính toán dữ liệu thống kê
  //     this.calculateStatistics();
  //   });
  // }

  // // Hàm tính toán dữ liệu thống kê
  // calculateStatistics(): void {
  //   this.statisticsData = [];

  //   // Lặp qua từng danh mục
  //   this.categories.forEach(category => {
  //     // Lấy sản phẩm thuộc danh mục này từ ProductService
  //     this.productService.getProductsByCategory(category.cateId).subscribe(products => {
  //       const quantity = products.length;
  //       const highestPrice = Math.max(...products.map(product => product.price));
  //       const lowestPrice = Math.min(...products.map(product => product.price));
  //       const averagePrice = products.reduce((sum, product) => sum + product.price, 0) / quantity;

  //       // Tạo một đối tượng chứa dữ liệu thống kê và đưa vào mảng statisticsData
  //       const statsItem = {
  //         categoryName: category.cateName,
  //         categoryCode: category.cateCode,
  //         quantity,
  //         highestPrice,
  //         lowestPrice,
  //         averagePrice
  //       };

  //       this.statisticsData.push(statsItem);
  //     });
  //   });
  // }
}
