import { Component, OnInit } from '@angular/core';
import { Product } from '../entities/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'app/@core/services/apis/product.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import 'assets/fonts/OpenSans-Regular-normal.js';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  products: Product[] = [];
  filterValue = '';
  title: string = '';
  dataProduct: Product | null = null;
  isDeleteDialogOpen = false;
  isDialogOpen = false;
  formData: FormGroup;
  editProductId: number | null = null;
  isEdit = false;
  confirmationMessage: string = '';
  originalProduct: Product[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {
    this.formData = this.formBuilder.group({
      productType: ['', Validators.required],
      productName: ['', Validators.required],
      imageURL: ['', Validators.required],
      price: ['', Validators.required],
      expiryDate: ['', Validators.required],
      quantity: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadProduct();
  }

  loadProduct() {
    this.productService.getAllProducts().subscribe({
      next: (res: any) => {
        const { data, status } = res;
        if (status === 'success') {
          this.products = data.products;
          this.originalProduct = [...data.products]; // Lưu trữ sản phẩm ban đầu
        }
      },
      error: (err) => {
        console.error('Error loading products', err);
      },
    });
  }

  openDialog() {
    this.isDialogOpen = true;
    this.formData.reset(); // Reset form khi mở dialog
  }

  openDialogDelete(product: Product) {
    if (product) {
      this.isDeleteDialogOpen = true;
      this.dataProduct = product;
      this.title = 'Confirm Delete';
      this.confirmationMessage = `Bạn có chắc chắn muốn xóa sản phẩm ${product.productName}?`;
    }
  }

  closeDialog() {
    this.isDialogOpen = false;
    this.isEdit = false;
    this.editProductId = null;
    this.formData.reset();
  }

  filter() {
    const filterText = this.filterValue.trim().toLowerCase();
    if (!filterText) {
      this.products = [...this.originalProduct]; // Reset lại danh sách sản phẩm khi không có bộ lọc
      return;
    }
    this.products = this.originalProduct.filter((product) => {
      return (
        product.productType.toLowerCase().includes(filterText) ||
        product.productName.toLowerCase().includes(filterText)
      );
    });
  }

  trackByProduct(index: number, product: Product): number {
    return product.productID;
  }

  close() {
    this.isDeleteDialogOpen = false;
  }

  // Hàm chuyển đổi URL hình ảnh sang Base64
  async getBase64ImageFromURL(imageUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        const dataURL = canvas.toDataURL('image/png');

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = imageUrl;
    });
  }

  // Phương thức xuất file PDF
  public async exportPdf() {
    const doc = new jsPDF('p', 'mm', 'a4'); // Tạo một tài liệu PDF mới với kích thước A4
    const exportData: any[] = [];
    const exportColumns = {
      productName: 'Product name',
      cateName: 'Category',
      price: 'Price',
      qty: 'Qty',
    };

    // Đăng ký font trước khi sử dụng
    if (doc.getFontList()['Open Sans']) {
      doc.setFont('Open Sans');
    }

    // Lặp qua danh sách sản phẩm và thêm vào mảng dữ liệu xuất
    for (const product of this.products) {
      const row = [
        product.productName,
        product.productType,
        product.productPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
        product.quantity.toString(),
      ];
      exportData.push(row);
    }

    autoTable(doc, {
      head: [Object.values(exportColumns)], // Mảng các tiêu đề cột
      body: exportData, // Mảng các dòng dữ liệu
    
      styles: {
        font: 'OpenSans-Regular',
        fontSize: 9,
        textColor: [0, 0, 0],
        lineColor: [0, 0, 0],
        lineWidth: 0.1,
        halign: 'left',
        valign: 'middle',
      },
      // columnStyles: {
      //   0: { cellWidth: 30 }, // Tên sản phẩm
      //   1: { cellWidth: 40 }, // Danh mục
      //   2: { cellWidth: 20 }, // Giá
      //   3: { cellWidth: 20 }, // Số lượng
      // },
      headStyles: {
        fillColor: [200, 200, 255], // Màu nền header
        textColor: [0, 0, 0], // Màu chữ header
        fontStyle: 'bold', // Kiểu chữ header
        halign: 'center', // Canh giữa header
      },
      bodyStyles: {
        fillColor: [255, 255, 255], // Màu nền body
        textColor: [0, 0, 0], // Màu chữ body
        halign: 'left', // Canh lề trái body
        valign: 'middle', // Canh giữa theo chiều dọc body
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245], // Màu nền của các dòng xen kẽ
      },
      margin: { top: 20, right: 10, bottom: 20, left: 10, horizontal: 10  }, // Lề của trang PDF
      pageBreak: 'auto', // Tự động ngắt trang nếu nội dung quá dài
    });
    

    doc.save('dashboard.pdf'); // Lưu tệp PDF
  }
}