import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerService } from "../../@theme/components/spinner/spinner.service";
import { AuthService } from "../../@core/services/apis";
import { LocalStorageService } from "../../@core/services/common";
import { LOCALSTORAGE_KEY, ROUTER_CONFIG } from "../../@core/config";
import { IAlertMessage } from "../../@theme/components/alert/ngx-alerts.component";
import { finalize } from "rxjs";

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
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  onSubmit() {
    this.router.navigate([ROUTER_CONFIG.pages]).then();
    // if (this.loginForm.valid) {
    //   this.spinner.show(); // Hiển thị spinner khi form được submit
    //   this.auth.login(this.loginForm.value).pipe(
    //     finalize(() => {
    //       this.spinner.hide(); // Ẩn spinner sau khi thử đăng nhập
    //     })
    //   ).subscribe({
    //     next: (res) => {
    //       console.log('Đăng nhập thành công', res);
    //       this.handleLoginSuccess(res);
    //     },
    //     error: (error) => {
    //       console.error('Đăng nhập thất bại', error);
    //       this.handleLoginFailure();
    //     }
    //   });
    // }
  }
  
  
  // Xử lý khi đăng nhập thành công
  protected handleLoginSuccess(res) {
    this.storageService.setItem(LOCALSTORAGE_KEY.userInfo, res.name);
    this.router.navigate([ROUTER_CONFIG.pages]).then();
  }
  
  // Xử lý khi đăng nhập thất bại
  protected handleLoginFailure() {
    this.spinner.hide();
    this.alertMessages = [{ status: 'danger', message: 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.' }];
  }
  
}
