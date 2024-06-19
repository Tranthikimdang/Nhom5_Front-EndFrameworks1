import { Component, OnInit } from '@angular/core';
import { Product } from '../entities/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'app/@core/services/apis/product.service';
import { ImageUploadService } from 'app/@core/services/apis/upload.service';
import { IAlertMessage } from 'app/@theme/components/alert/ngx-alerts.component';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  alertMessages: IAlertMessage[] = []; // thông báo lỗi
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
  file: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private imageUploadService: ImageUploadService
  ) {
    this.formData = this.formBuilder.group({
      productType: ['', Validators.required],
      productName: ['', Validators.required],
      productImage :['', Validators.required],
      productPrice: ['', Validators.required],
      expiryDate: ['', Validators.required],
      quantity: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(){
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


  async addProduct(): Promise<void> {
    console.log(this.formData);
    if (this.formData.valid) {
      const formDataImg = new FormData();
      formDataImg.append('image', this.file);

      try {
        const res = await this.imageUploadService.uploadImage(formDataImg).toPromise();
        if (res.status === 201){
          const productImage = res.imagePath;
          if(!this.isEdit) {
            const newProduct: Product = {
              productID:  this.editProductId,
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
              error : (err) => {
                console.error('Lỗi khi thêm:', err);
              }
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
                error : (err) => {
                  console.error('Lỗi khi sửa:', err);
                }
              });
            }
          }
        } else {
          console.error('Lỗi khi tải ảnh:', res);
        }
      }catch (error) {
        console.error('Lỗi khi tải ảnh:', error);
      }
      this.closeDiaLog();
      this.alertMessages = [{ status: 'success', message: 'Successful!' }]; // hiện thông báo submit thành công
    } else {
      console.log('Form không hợp lệ');
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
          this.loadProduct();
          this.alertMessages = [{ status: 'success', message: 'Successful!' }]; // hiện thông báo submit thành công
        },
        error: (err: any) => {
          console.error('Lỗi khi xóa:', err);
        },
      });
    }
  }

  onImageSelected(event) {
    this.file = event.target.files[0];
  }

  close() {
    this.isDeleteDialogOpen = false;
  }

  openEditDialog(product: Product) {
    console.log("aaaaa");

    if (product) {
      this.isDialogOpen = true;
      this.isEdit = true;
      this.editProductId = product.productID;
      console.log(product)
      this.formData.patchValue({
        productType: product.productType,
        productName: product.productName,
        productPrice: product.productPrice,
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
