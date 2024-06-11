import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './product.service'; // Đảm bảo nhập đúng đường dẫn tới ProductService

@Component({
  selector: 'app-statistics-detail',
  templateUrl: './statistics-detail.component.html',
  styleUrls: ['./statistics-detail.component.scss']
})
export class StatisticsDetailComponent implements OnInit {
  categoryId: number; // Khai báo categoryId để lưu ID danh mục từ route

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService // Inject ProductService vào component
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryId = +params['id']; // Lấy ID danh mục từ route
      this.getDataForCategory(this.categoryId); // Gọi hàm để lấy dữ liệu sản phẩm dựa trên ID danh mục
    });
  }

  getDataForCategory(categoryId: number): void {
    this.productService.getProductsByCategory(categoryId).subscribe(
      (data: any) => {
        // Xử lý dữ liệu sản phẩm ở đây
        console.log(data);
        // Sau khi nhận được dữ liệu sản phẩm, bạn có thể render biểu đồ ở đây
        this.renderPieChart(data); // Ví dụ: Truyền dữ liệu sản phẩm vào hàm renderPieChart()
      },
      (error) => {
        console.error('Error occurred while fetching products:', error);
      }
    );
  }

  renderPieChart(products: any[]): void {
    // Code để render biểu đồ ở đây
  }
}
