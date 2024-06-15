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
      // this.router.navigate([ROUTER_CONFIG.pages]).then();
      this.spinner.show(); // Show spinner when form is submitted

      const { email, password } = this.loginForm.value;
      
      this.auth.login(email, password).pipe(
        finalize(() => {
          this.spinner.hide(); // Hide spinner after login attempt
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
    
    const { user, token } = res.data;
    this.storageService.setItem(LOCALSTORAGE_KEY.userInfo, JSON.stringify(user));
    this.storageService.setItem(LOCALSTORAGE_KEY.token, token);
    this.router.navigate([ROUTER_CONFIG.pages]).then();
    this.spinner.hide();
  }

  protected handleLoginFailed() {
    this.spinner.hide();
    this.alertMessages = [{ status: 'danger', message: 'Account or password is incorrect' }];
  }
}
