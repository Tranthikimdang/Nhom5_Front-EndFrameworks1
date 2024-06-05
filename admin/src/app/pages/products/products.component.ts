import { Component, OnInit } from '@angular/core';
import { Product } from '../entities/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'app/@core/services/apis/product.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  products: Product[] = [];
  filterValue = '';
  title : string;
  dataProduct: any;
  isDeleteDialogOpen = false;
  isDialogOpen = false;
  formData: FormGroup;
  editProductId: any = null;
  isEdit = false;
  confirmationMessage: string;
  originalProduct : Product[];

  constructor(private formBuilder : FormBuilder, private productService : ProductService) {
    this.formData = this.formBuilder.group({
      productType: ['', Validators.required],
      productName: ['', Validators.required],
      imageURL: ['', Validators.required],
      price: ['', Validators.required],
      expiryDate: ['', Validators.required],
      quantity: ['', Validators.required],
    })
  }
  ngOnInit() {
  }

  loadProduct() {
    this.productService.getAllProducts().subscribe({
      next: (res : any) => {
        const { data, status } = res;
        if (status ==='success') {
          this.products = data.products;
          this.originalProduct = data.products; // Lưu trữ các sản phẩm ban đầu
        }
      },
      error: (err) => {
        console.error('Error loading products', err);
      },
    });
  }

  openDialog() {
    this.isDialogOpen = true;
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

  addProduct() : void {
    if (this.formData.valid) {
      if (!this.isEdit) {
        const newProduct: Product = {
          productType: this.formData.value.productType,
          productName: this.formData.value.productName,
          imageURL: this.formData.value.imageURL,
          price: this.formData.value.price,
          expiryDate: this.formData.value.expiryDate,
          quantity: this.formData.value.quantity,
          productID: 0,
        }
        this.productService.createProduct(newProduct).subscribe({
          next: () => {
            this.isDialogOpen = false;
            this.loadProduct();
          },
          error: (err) => {
            console.error('Error adding product', err);
          },
        });
      } else {
        if (this.editProductId) {
          const editProduct : Product = {
            productType: this.formData.value.productType,
            productName: this.formData.value.productName,
            imageURL: this.formData.value.imageURL,
            price: this.formData.value.price,
            expiryDate: this.formData.value.expiryDate,
            quantity: this.formData.value.quantity,
            productID: this.editProductId,
          }
          this.productService.updateProduct(editProduct).subscribe({
            next: () => {
              this.isDialogOpen = false;
              this.loadProduct();
            },
            error: (err) => {
              console.error('Error edit product', err);
            },
          });
        }
      }
      this.closeDialog();
    } else {
      console.error('Form data invalid');
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
      return productType.includes(filterText) ||
            productName.includes(filterText);
    });
  }

  trackByProduct (index : number , product : Product) : number {
    return product.productID;
  }

  handleDelete() {
    if (this.dataProduct && this.dataProduct.productID) {
      this.isDeleteDialogOpen = false;
      this.productService.deleteProduct(this.dataProduct.productID).subscribe({
        next: () => {
          this.isDeleteDialogOpen = false;
          this.dataProduct = {};
          this.loadProduct();
        },
        error: (err : any) => {
          console.error('Error deleting product', err);
        },
      });
    }
  }

  close() {
    this.isDeleteDialogOpen = false;
  }
}
