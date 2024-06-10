import { Component , OnInit } from '@angular/core';
import { User } from '../entities/user'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Thêm FormBuilder và Validators vào imports
import { UserService } from 'app/@core/services/apis/user.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  filterValue = '';
  title: string;
  dataUser: any;
  isDeleteDialogOpen = false;
  isDialogOpen = false;
  formData: FormGroup;
  editUserId: any = null;
  isEdit = false;
  confirmationMessage: string;
  originalUsers: User[]; 
  editingUser: User | null = null;

  constructor(private formBuilder: FormBuilder, private userService: UserService)  { // Thêm UserService vào constructor
    this.formData = this.formBuilder.group({
      userName: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      userPhone: ['', [Validators.required, Validators.maxLength(10)]],
      userAddress: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.userService.getAllUser().subscribe({
      next: (res: any) => { // Sửa kiểu dữ liệu của res
        const { data, status } = res;
        if (status === 'success') {
          this.users = data.users;
          this.originalUsers = data.users; // Lưu trữ các ý kiến ​​​​ban đầu
        }
      },
      error: (err) => {
        console.error('Error loading Users', err);
      },
    });
  }

  openDialog() {
    this.isDialogOpen = true;
  }

  openDialogDelete(user: User) { // Sửa kiểu dữ liệu của User
    if (user) {
      this.isDeleteDialogOpen = true;
      this.dataUser = user;
      this.title = 'Confirm Delete';
      this.confirmationMessage = `Are you sure you want to delete the User from ${user.userName}?`;
    }
  }

  closeDialog() {
    this.isDialogOpen = false;
    this.isEdit = false;
    this.editUserId = null;
    this.formData.reset();
  }

  addUser(): void {
    if (this.formData.valid) {
      if (!this.isEdit) {
        const newUser: User = {
          userName: this.formData.value.userName,
          userEmail: this.formData.value.userEmail,      
          userPhone: this.formData.value.userPhone,            
          userAddress: this.formData.value.userAddress,   
        };

        this.userService.createUser(newUser).subscribe({
          next: () => { // Sửa kiểu dữ liệu của next
            this.isDialogOpen = false;
            this.loadUser();
          },
          error: (err) => {
            console.error('Lỗi khi thêm:', err);
          },
        });
      } else {
        if (this.editUserId) {
          const editedUser: User = {
            userId: this.editUserId,
            userName: this.formData.value.userName,
            userEmail: this.formData.value.userEmail,      
            userPhone: this.formData.value.userPhone,            
            userAddress: this.formData.value.userAddress,            
          };

          this.userService.updateUser(editedUser).subscribe({ // Sửa tên hàm từ updateCommennt thành updateUser
            next: () => { // Sửa kiểu dữ liệu của next
              this.isDialogOpen = false;
              this.loadUser();
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
    if (!this.originalUsers) {
      return;
    }

    const filterText = this.filterValue.trim().toLowerCase();
    if (filterText === '') {
      this.users = this.originalUsers;
      return;
    }

    this.users = this.originalUsers.filter(user => {
      const userName = user.userName.trim().toLowerCase();
      const userEmail = user.userEmail.trim().toLowerCase();
      const userPhone = user.userPhone.trim().toLowerCase();
      const userAddress = user.userAddress.trim().toLowerCase();
      
      return userName.includes(filterText) ||
             userEmail.includes(filterText) ||
             userPhone.includes(filterText) ||
             userAddress.includes(filterText);
    });
  }

  trackByUser(index: number, user: User): number {
    return user.userId;
  }

  handleDelete() {
    if (this.dataUser && this.dataUser.userId) {
    this.isDeleteDialogOpen = false;
    this.userService.deleteUser(this.dataUser.userId).subscribe({
    next: () => { // Sửa kiểu dữ liệu của next
    this.isDeleteDialogOpen = false;
    this.dataUser = {};
    this.loadUser();
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
  openEditDialog(user: User) {
    this.isDialogOpen = true;
    this.isEdit = true;
    this.editUserId = user.userId;
    this.formData.patchValue({
      userName: user.userName,
      userEmail: user.userEmail,
      userPhone: user.userPhone,
      userAddress: user.userAddress
    });
  }

  closeEditDialog() {
    this.isDialogOpen = false;
    this.isEdit = false;
    this.editingUser = null;
    this.formData.reset();
  }

  editUser(user: User) {
    this.editingUser = user; 
    this.openEditDialog(user);
  }
}
