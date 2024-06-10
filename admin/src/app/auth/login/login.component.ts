import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerService } from "../../@theme/components/spinner/spinner.service";
import { AuthService } from "../../@core/services/apis";
import { LocalStorageService } from "../../@core/services/common";
import { LOCALSTORAGE_KEY, ROUTER_CONFIG } from "../../@core/config";
import { IAlertMessage } from "../../@theme/components/alert/ngx-alerts.component";
import { finalize, switchMap } from "rxjs";

@Component({
  selector: 'ngx-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  alertMessages: IAlertMessage[] = [];

  constructor(
    private router: Router,
    private spinner: SpinnerService,
    private auth: AuthService,
    private storageService: LocalStorageService,
  ) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.spinner.show(); // Hiển thị spinner khi form được gửi
  
      const { email, password } = this.loginForm.value; // Lấy email và password từ form
  
      this.auth.login(email, password).pipe( // Sử dụng email và password khi gọi phương thức login
        switchMap((userExists: boolean) => {
          if (userExists) {
            
            
            return this.auth.login(email, password);
          } else {
            throw new Error('User does not exist');
          }
        }),
        finalize(() => {
          this.spinner.hide(); // Ẩn spinner sau khi đăng nhập thử
        })
      ).subscribe({
        next: (res) => {
          this.handleLoginSuccess(res);
        },
        error: (error) => {
          this.handleLoginFailed();
        }
      });
    }
  }
  
  
  protected handleLoginSuccess(res) {
    this.storageService.setItem(LOCALSTORAGE_KEY.userInfo, res.name);
    // this.storageService.setItem(LOCALSTORAGE_KEY.token, res.token);
    this.router.navigate([ROUTER_CONFIG.pages]).then();
    this.spinner.hide();
  }

  protected handleLoginFailed() {
    this.spinner.hide();
    this.alertMessages = [{status: 'danger', message: 'Tài khoản hoặc mật khẩu không chính xác'}];
  }
}
