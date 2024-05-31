import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/@core/services/apis/auth.service';


@Component({
  selector: 'app-update-cate',
  templateUrl: './update-cate.component.html',
  styleUrls: ['./update-cate.component.scss']
})
export class UpdateCateComponent implements OnInit {
  editForm!:FormGroup;

  constructor(
    private router: Router,
    private authService : AuthService,
  ) {}

  ngOnInit(): void {
    this.editForm = new FormGroup({
      name: new FormControl('',[Validators.required , Validators.minLength(2)]),
    })
  }
  
  onSubmit(){
    console.log(this.editForm.value);   
    if(this.editForm.valid){
      this.authService.login(this.editForm.value).pipe(       
      ).subscribe({
          next : this.handleLoginSuccess.bind(this),
          error : this.handleLoginFailed.bind(this)
        }
      )
    } 
  }

  protected handleLoginSuccess(res : any) {
    console.log(res);    
  }

  protected handleLoginFailed() {} 


  cancel() {
    this.router.navigate(['/pages/categories']);
  }
}
