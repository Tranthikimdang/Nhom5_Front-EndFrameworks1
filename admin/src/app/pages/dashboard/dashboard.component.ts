import { Component, OnInit } from '@angular/core';
import { Product } from '../entities/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'app/@core/services/apis/product.service';

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
  currentPage: number = 1;
  totalItems: number = 0;
  totalPages: number = 0;
  lastPage: number = 0;
  apiUrl = 'http://localhost:3000/api/dashboard';
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
    this.loadProducts(this.currentPage);
  }
  
  loadProducts(page: number) {
    const pageSize = 10; // Số sản phẩm trên mỗi trang
    this.productService.getProductsByPage(page, this.pageSize).subscribe({
      next: (res: any) => {
        const { data, status } = res;
        if (status === 'success') {
        this.products = data.products;
        // this.lastPage = res.meta ? res.meta.last_page : 1;
        // this.currentPage = res.meta.current_page;
        }
      },
      error: (err) => {
        console.error('Error loading products', err);
      }
    });
  }
  


  onPageChange(page: number) {
    this.currentPage = page;
    this.loadProducts(page);
  }

  openDialog() {
    this.isDialogOpen = true;
    this.formData.reset();
  }

  openDialogDelete(product: Product) {
    if (product) {
      this.isDeleteDialogOpen = true;
      this.dataProduct = product;
      this.title = 'Confirm Delete';
      this.confirmationMessage = `Are you sure you want to delete product ${product.productName}?`;
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
            this.loadProducts(this.currentPage);
            this.closeDialog();
          },
          error: (err) => {
            console.error('Error adding product', err);
          },
        });
      } else if (this.editProductId) {
        this.productService.updateProduct(product).subscribe({
          next: () => {
            this.loadProducts(this.currentPage);
            this.closeDialog();
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
      this.products = [...this.originalProduct];
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

  handleDelete() {
    if (this.dataProduct && this.dataProduct.productID) {
      this.isDeleteDialogOpen = false;
      this.productService.deleteProduct(this.dataProduct.productID).subscribe({
        next: () => {
          this.dataProduct = null;
          this.loadProducts(this.currentPage);
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