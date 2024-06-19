import { Component, OnInit } from '@angular/core';
import { Product } from '../entities/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'app/@core/services/apis/product.service';
import { ImageUploadService } from 'app/@core/services/apis/upload.service';
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
    private productService: ProductService,
    private imageUploadService: ImageUploadService
  ) {
    this.formData = this.formBuilder.group({
      productType: ['', Validators.required],
      productName: ['', Validators.required],
      productImage: ['', Validators.required],
      productPrice: ['', Validators.required],
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
        console.error('Error loading dashboard', err);
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

  async addProduct(): Promise<void> {
    console.log(this.formData);
    if (this.formData.valid) {
      const formDataImg = new FormData();
      // formDataImg.append('image', this.file);

      try {
        const res = await this.imageUploadService
          .uploadImage(formDataImg)
          .toPromise();
        if (res.status === 201) {
          const productImage = res.imagePath;
          if (!this.isEdit) {
            const newProduct: Product = {
              productID: this.editProductId,
              productType: this.formData.value.productType,
              productName: this.formData.value.productName,
              productImage: productImage,
              productPrice: this.formData.value.productPrice,
              expiryDate: this.formData.value.expiryDate,
              quantity: this.formData.value.quantity,
            };
            this.productService.createProduct(newProduct).subscribe({
              next: () => {
                this.isDialogOpen = false;
                this.loadProduct();
              },
              error: (err) => {
                console.error('Lỗi khi thêm:', err);
              },
            });
          } else {
            if (this.editProductId) {
              const editedProduct: Product = {
                productID: this.editProductId,
                productType: this.formData.value.productType,
                productName: this.formData.value.productName,
                productImage: productImage,
                productPrice: this.formData.value.productPrice,
                expiryDate: this.formData.value.expiryDate,
                quantity: this.formData.value.quantity,
              };
              this.productService.updateProduct(editedProduct).subscribe({
                next: () => {
                  this.isDialogOpen = false;
                  this.loadProduct();
                },
                error: (err) => {
                  console.error('Lỗi khi sửa:', err);
                },
              });
            }
          }
        } else {
          console.error('Lỗi khi tải ảnh:', res);
        }
      } catch (error) {
        console.error('Lỗi khi tải ảnh:', error);
      }
      this.closeDialog();
    } else {
      console.log('Form không hợp lệ');
    }
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

  // Phương thức chuyển đổi URL hình ảnh sang Base64
  async getBase64ImageFromURL(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL('image/png'); // Đảm bảo hình ảnh được chuyển đổi sang định dạng PNG
        resolve(dataURL);
      };
      img.onerror = (error) => reject(error);
      img.src = url;
    });
  }

  // Phương thức xuất file PDF
  public async exportPdf() {
    const doc = new jsPDF('p', 'mm', 'a4'); // Tạo một tài liệu PDF mới với kích thước A4
    const exportData: any[] = [];
    const exportColumns = {
      productID: 'ID',
      productImage: 'Hình ảnh',
      productName: 'Tên sản phẩm',
      productType: 'Loại sản phẩm',
      productPrice: 'Giá',
      qty: 'Số lượng',
    };

    // Đăng ký font trước khi sử dụng
    if (doc.getFontList()['Open Sans']) {
      doc.setFont('Open Sans');
    }

    // Thêm productID tự động tăng từ 1
    for (let i = 0; i < this.products.length; i++) {
      this.products[i].productID = i + 1;
    }

    // Lặp qua danh sách sản phẩm và thêm vào mảng dữ liệu xuất
    for (const product of this.products) {
      try {
        console.log(`Đang xử lý hình ảnh cho sản phẩm: ${product.productName}`);
        const base64Image = await this.getBase64ImageFromURL(
          product.productImage
        );
        console.log(
          `Hình ảnh được chuyển đổi sang base64 cho sản phẩm: ${product.productName}`
        );
        const row = [
          product.productID,
          { image: base64Image, width: 26, height: 20 }, // Đảm bảo hình ảnh được truyền đúng cách
          product.productName,
          product.productType,
          product.productPrice.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          }),
          product.quantity.toString(),
        ];
        exportData.push(row);
      } catch (error) {
        console.error(
          'Lỗi tải hình ảnh cho sản phẩm',
          product.productName,
          error
        );
        // Xử lý lỗi, có thể thêm hình ảnh hoặc văn bản thay thế
        const row = [
          product.productID,
          {
            image:
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA' + // Hình ảnh thay thế dưới dạng base64
              'AAAFCAYAAACNbyblAAAAHElEQVQI12P4' +
              '//8/w38GIAXDIBKE0DHxgljNBAAO' +
              '9TXL0Y4OHwAAAABJRU5ErkJggg==',
            width: 26,
            height: 20,
          }, // Hình ảnh hoặc văn bản thay thế
          product.productName,
          product.productType,
          product.productPrice.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          }),
          product.quantity.toString(),
        ];
        exportData.push(row);
      }
    }

    autoTable(doc, {
      head: [Object.values(exportColumns)], // Mảng các tiêu đề cột
      body: exportData, // Mảng các dòng dữ liệu
      didDrawCell: (data) => {
        if (data.column.index === 1 && typeof data.cell.raw === 'object') {
          // Đảm bảo chỉ số cột và loại dữ liệu đúng
          const { image, width, height }: any = data.cell.raw;
          if (image && width > 0 && height > 0) {
            const xPos = data.cell.x + (data.cell.width - width) / 2; // Canh giữa hình ảnh theo chiều ngang trong ô
            const yPos = data.cell.y + (data.cell.height - height) / 2; // Canh giữa hình ảnh theo chiều dọc trong ô
            doc.addImage(image, 'PNG', xPos, yPos, width, height); // Thêm hình ảnh vào tài liệu PDF với loại MIME đúng
          } else {
            console.error('Kích thước hình ảnh không hợp lệ:', width, height);
          }
        }
      },
      styles: {
        font: 'OpenSans-Regular',
        fontSize: 9,
        textColor: [0, 0, 0],
        lineColor: [0, 0, 0],
        lineWidth: 0.1,
        valign: 'middle',
      },
      columnStyles: {
        // 0: { cellWidth: 10 }, // ID
        1: { cellWidth: 30, minCellHeight: 30 }, // Hình ảnh (điều chỉnh chiều rộng nếu cần)
        // 2: { cellWidth: 30 }, // Tên sản phẩm
        // 3: { cellWidth: 35 }, // Loại sản phẩm
        // 4: { cellWidth: 30 }, // Giá
        // 5: { cellWidth: 20 }, // Số lượng
      },
      headStyles: {
        fillColor: [200, 200, 255], // Màu nền header
        textColor: [0, 0, 0], // Màu chữ header
        fontStyle: 'bold', // Kiểu chữ header
        halign: 'center', // Canh giữa header
      },
      bodyStyles: {
        fillColor: [255, 255, 255], // Màu nền body
        textColor: [0, 0, 0], // Màu chữ body
        valign: 'middle', // Canh giữa theo chiều dọc body
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245], // Màu nền của các dòng xen kẽ
      },
      margin: { top: 20, right: 10, bottom: 20, left: 10, horizontal: 10 }, // Lề của trang PDF
      pageBreak: 'auto', // Tự động ngắt trang nếu nội dung quá dài
    });

    doc.save('dashboard.pdf'); // Lưu tệp PDF
  }
}
