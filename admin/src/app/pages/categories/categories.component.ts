import { Component ,OnInit } from '@angular/core';
import { Category } from '../entities/categories'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'app/@core/services/apis/category.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
 
  categories: Category[] = [];
  filterValue = '';
  title: string;
  dataCategory: any;
  isDeleteDialogOpen = false;
  isDialogOpen = false;
  formData: FormGroup;
  editCategoryId: any = null;
  isEdit = false;
  confirmationMessage: string;
  originalCategories: Category[]; 

  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService)  { // Thêm categoryService vào constructor
    this.formData = this.formBuilder.group({
      cateName: ['', Validators.required],      
    });
  }

  ngOnInit(): void {
    this.loadCategory();
  }

  loadCategory() {
    this.categoryService.getAllCategory().subscribe({
      next: (res: any) => { // Sửa kiểu dữ liệu của res
        const { data, status } = res;
        if (status === 'success') {
          this.categories = data.categories;
          this.originalCategories = data.categories; // Lưu trữ các ý kiến ​​​​ban đầu
        }
      },
      error: (err) => {
        console.error('Error loading category', err);
      },
    });
  }

  openDialog() {
    this.isDialogOpen = true;
  }

  openDialogDelete(cate: Category) { 
    if (cate) {
      this.isDeleteDialogOpen = true;
      this.dataCategory = cate;
      this.title = 'Confirm Delete';
      this.confirmationMessage = `Are you sure you want to delete the category from ${cate.cateName}?`;
    }
  }

  closeDialog() {
    this.isDialogOpen = false;
    this.isEdit = false;
    this.editCategoryId = null;
    this.formData.reset();
  }

  addCategory(): void {
    if (this.formData.valid) {
      if (!this.isEdit) {
        const newCategory: Category = {
          cateName: this.formData.value.cateName,          
        };

        this.categoryService.createCategory(newCategory).subscribe({
          next: () => { // Sửa kiểu dữ liệu của next
            this.isDialogOpen = false;
            this.loadCategory();
          },
          error: (err) => {
            console.error('Lỗi khi thêm:', err);
          },
        });
      } else {
        if (this.editCategoryId) {
          const editedCategories: Category = {
            cateId: this.editCategoryId,
            cateName: this.formData.value.cateName,
            
          };

          this.categoryService.updateCategory(editedCategories).subscribe({ // Sửa tên hàm từ updateCommennt thành updateComment
            next: () => { // Sửa kiểu dữ liệu của next
              this.isDialogOpen = false;
              this.loadCategory();
            },
            error: (err) => {
              console.error('Lỗi khi sửa:', err);
            },
          });
        }
      }
      this.closeDialog();
    } else {
      // Hiển thị thông báo lỗi
      console.log('Form không hợp lệ');
    }
  }

  filter() {
    if (!this.originalCategories) {
      return;
    }

    const filterText = this.filterValue.trim().toLowerCase();
    if (filterText === '') {
      this.categories = this.originalCategories;
      return;
    }

    this.categories = this.originalCategories.filter(cate => {
      const cateName = cate.cateName.trim().toLowerCase();
      
      return cateName.includes(filterText);
    });
  }

  trackByCategory(index: number, category: Category): number {
    return category.cateId;
  }

  handleDelete() {
    if (this.dataCategory && this.dataCategory.cateId) {
    this.isDeleteDialogOpen = false;
    this.categoryService.deleteCategory(this.dataCategory.cateId).subscribe({
    next: () => { // Sửa kiểu dữ liệu của next
    this.isDeleteDialogOpen = false;
    this.dataCategory = {};
    this.loadCategory();
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
  
}
