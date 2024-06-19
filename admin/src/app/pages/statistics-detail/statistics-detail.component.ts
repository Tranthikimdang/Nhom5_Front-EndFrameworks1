import { Component, AfterViewInit } from '@angular/core';
import { StatictiscService } from 'app/@core/services/apis/statictisc.service'
import { ActivatedRoute } from '@angular/router';

declare var CanvasJS: any;

@Component({
  selector: 'app-statistics-detail',
  templateUrl: './statistics-detail.component.html'
})
export class StatisticsDetailComponent implements AfterViewInit {
  products: any[] = [];
  categoryId: number;

  constructor(private statictiscService: StatictiscService, private route: ActivatedRoute, // Inject ActivatedRoute
    ) {}

  ngAfterViewInit(): void {
    this.route.params.subscribe(params => {
      this.categoryId = +params['id']; // Lấy ID danh mục từ tham số đường dẫn
      this.getProductData(this.categoryId); // Gọi hàm lấy dữ liệu sản phẩm với ID danh mục
    });
  }

  getProductData(categoryId: number): void {
    this.statictiscService.getProductsByCategory(categoryId).subscribe(
      (data: any) => {
        
        this.products = data.data.products;
        // this.renderPieChart();
      },
      (error) => {
        console.error('Error occurred while fetching products:', error);
      }
    );
  }
}

