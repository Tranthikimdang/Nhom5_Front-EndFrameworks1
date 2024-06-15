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

  products : Product[] = [];
  filterValue = '';
  title: string = '';
  dataProduct: any;
  isDeleteDialogOpen = false;
  isDialogOpen = false;
  formData: FormGroup;
  editProductId: any = null;
  isEdit = false;
  confirmationMessage: string = '';
  originalProduct: Product[];
  editingProduct: Product | null = null;
  currentPage: number = 1;
  totalItems: number = 0;
  totalPages: number = 0;
  lastPage: number = 0;
  pageSize: number = 10;

  constructor(private formBuilder: FormBuilder,private productService: ProductService) {
    this.formData = this.formBuilder.group({
      productType: ['', Validators.required],
      productName: ['', Validators.required],
      price: ['', Validators.required],
      expiryDate: ['', Validators.required],
      quantity: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(page: number){
    const pageSize = 10;
    this.productService.getAllProducts().subscribe({
      next: (res: any) => {
        const { data, status } = res;
        if (status === 'success') {
          this.products = data.products;
          this.originalProduct = data.products;
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadProduct(page);
  }


  openDialog(){
    this.isDialogOpen = true;
  }

  openDialogDelete( pro : Product ) {
    if (pro) {
      this.isDeleteDialogOpen = true;
      this.confirmationMessage = `Are you sure you want to delete product ${pro.productName}?`;
      this.dataProduct = pro;
      this.title = 'Confirm Delete';
    }
  }

  closeDiaLog(){
    this.isDialogOpen = false;
    this.isEdit = false;
    this.editProductId = null;
    this.formData.reset();
  }

  addProduct(): void {
    if (this.formData.valid) {
      if (!this.isEdit) {
      const newProduct: Product = {
        productID: 0,
        productType: this.formData.value.productType,
        productName: this.formData.value.productName,
        price: this.formData.value.price,
        expiryDate: this.formData.value.expiryDate,
        quantity: this.formData.value.quantity,
      };
      this.productService.createProduct(newProduct).subscribe({
        next: () => {
          this.isDialogOpen = false;
          this.loadProduct(this.currentPage);
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    } else {
      if (this.editProductId) {

        const editProduct: Product = {
          productID: this.editProductId,
          productType: this.formData.value.productType,
          productName: this.formData.value.productName,
          price: this.formData.value.price,
          expiryDate: this.formData.value.expiryDate,
          quantity: this.formData.value.quantity,
        };
        this.productService.updateProduct(editProduct).subscribe({
          next: () => {
            this.isDialogOpen=false;
            this.loadProduct(this.currentPage);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }else {
        console.log('Form không hợp lệ');
      }
    }
    }

  }

  filter() {
    if (!this.originalProduct) {
      return;
    }

    const filterText = this.filterValue.trim().toLowerCase();
    if (filterText === '') {
      this.products = this.originalProduct;
      return;
    }

    this.products = this.originalProduct.filter(product => {
      const productType = product.productType.trim().toLowerCase();
      const productName = product.productName.trim().toLowerCase();
      return productType.includes(filterText) || productName.includes(filterText);
    });
  }
  trackByProduct(index: number, product : Product) {
    return product.productID;
  }

  handleDelete() {

    if (this.dataProduct && this.dataProduct.productID) {
      this.isDeleteDialogOpen = false;
      this.productService.deleteProduct(this.dataProduct.productID).subscribe({
        next: () => {
          // Sửa kiểu dữ liệu của next
          this.isDeleteDialogOpen = false;
          this.dataProduct = {};
          this.loadProduct(this.currentPage);
        },
        error: (err: any) => {
          console.error('Lỗi khi xóa:', err);
        },
      });
    }
  }

  close() {
    this.isDeleteDialogOpen = false;
  }

  openEditDialog(product: Product) {
    if (product) {
      this.isDialogOpen = true;
      this.isEdit = true;
      this.editProductId = product.productID;
      this.formData.patchValue({
        productType: product.productType,
        productName: product.productName,
        price: product.price,
        expiryDate: product.expiryDate,
        quantity: product.quantity,
      });
    } else {
      console.error('Product is undefined or null');
    }
  }

  closeEditDialog(){
    this.isDialogOpen = false;
    this.isEdit = false;
    this.editProductId = null;
    this.formData.reset();
  }

  editProduct(product: Product) {
    this.editingProduct = product;
    this.openEditDialog(product);
  }
}
