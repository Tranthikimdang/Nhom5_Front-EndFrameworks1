import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/@core/services/apis/auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateUserComponent implements OnInit {
  
  addForm!:FormGroup;

  constructor(
    private router: Router,
    private authService : AuthService,
  ) {}

  ngOnInit(): void {
    this.addForm = new FormGroup({
      name: new FormControl('',[Validators.required , Validators.minLength(2) ,Validators.maxLength(20)]),
      email: new FormControl('',[Validators.required , Validators.email]),
      address: new FormControl('',[Validators.required , Validators.minLength(5)]),
    })
  }
  
  onSubmit(){
    console.log(this.addForm.value);   
    if(this.addForm.valid){
      this.authService.login(this.addForm.value).pipe(       
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
    this.router.navigate(['/pages/users']);
  }
}
