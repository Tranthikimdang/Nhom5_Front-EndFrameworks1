import { Component, OnInit } from '@angular/core';
import { Product } from '../entities/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'app/@core/services/apis/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
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
  currentPage: number = 1;
  totalItems: number = 0;
  totalPages: number = 0;
  lastPage: number = 0;
  apiUrl = 'http://localhost:3000/api/products';
  pageSize: number = 10;
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
    this.loadProduct(this.currentPage);
  }

  loadProduct(page: number) {
    const pageSize = 10; // Số sản phẩm trên mỗi trang
    this.productService.getProductsByPage(page, this.pageSize).subscribe({
      next: (res: any) => {
        const { data, status } = res;
        if (status === 'success') {
        this.products = data.products;
        
        }
      },
      error: (err) => {
        console.error('Error loading products', err);
      }
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

  addProduct(): void {
    if (this.formData.valid) {
      const product: Product = {
        productType: this.formData.value.productType,
        productName: this.formData.value.productName,
        imageURL: this.formData.value.imageURL,
        price: this.formData.value.price,
        expiryDate: this.formData.value.expiryDate,
        quantity: this.formData.value.quantity,
        productID: this.editProductId ?? 0,
      };

      if (!this.isEdit) {
        this.productService.createProduct(product).subscribe({
          next: () => {
            
            this.closeDialog(); // Đóng dialog và reset form sau khi thêm mới thành công
          },
          error: (err) => {
            console.error('Error adding product', err);
          },
        });
      } else if (this.editProductId) {
        this.productService.updateProduct(product).subscribe({
          next: () => {
            
            this.closeDialog(); // Đóng dialog và reset form sau khi chỉnh sửa thành công
          },
          error: (err) => {
            console.error('Error editing product', err);
          },
        });
      }
    } else {
      console.error('Form data invalid');
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

  trackByProduct(index: number, product: any): number {
    return product.productID;
  }

  handleDelete() {
    if (this.dataProduct && this.dataProduct.productID) {
      this.isDeleteDialogOpen = false;
      this.productService.deleteProduct(this.dataProduct.productID).subscribe({
        next: () => {
          this.dataProduct = null;
          
        },
        error: (err: any) => {
          console.error('Error deleting product', err);
        },
      });
    }
  }

  close() {
    this.isDeleteDialogOpen = false;
  }
  
}
