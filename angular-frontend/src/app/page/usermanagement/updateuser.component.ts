import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BaseComponent, PageConfig } from '../base/base.component';
import { Router,ActivatedRoute  } from '@angular/router';

@Component({
  template: `
    <app-page-header icon="supervised_user_circle">
      <h2>Update User</h2>
      <button routerLink="/userlist" mat-flat-button color="primary" class="action">
        <mat-icon class="mr-2">arrow_back</mat-icon>
        <span>Back</span>
      </button>
    </app-page-header>


      <div fxLayout="row" >
        
        <mat-card fxFlex="40" style="margin : 0px 20px 0px 20px">
                <mat-card-title>User Details</mat-card-title>
          <mat-card-content>
            <form [formGroup]="form" (ngSubmit)="updateUser()">
            <p>
                <mat-form-field fxFlex appearance="fill">
                <mat-label>User Name</mat-label>
                  <input type="text" matInput formControlName="userName" >
                </mat-form-field>
              </p>              
              <p>
                <mat-form-field fxFlex appearance="fill" >
                  <mat-label>Email ID</mat-label>
                  <input type="text" matInput formControlName="emailID" >
                </mat-form-field>
              </p>
              <p>
                <mat-form-field fxFlex appearance="fill">
                  <mat-label>User Status</mat-label>
                  <input type="text" matInput  formControlName="userStatus" >
                </mat-form-field>
              </p>
              <p>
                <mat-form-field fxFlex appearance="fill" >
                <mat-select matInput placeholder="User Role" formControlName="userRole">
                  <mat-option value="ADMIN">Admin</mat-option>
                  <mat-option value="OPUSER">OP User</mat-option>
                  <mat-option value="BPSUSER">BPS User</mat-option>
                </mat-select>
                </mat-form-field>
              </p>

              
              <button type="submit" mat-raised-button color="primary">Save</button>
             
            </form>
          </mat-card-content>
        </mat-card>

       
      </div>	

  `,
  styles: [
    `


    `,
  ]
})

@PageConfig({
	pageId:"user"
})

export class UpdateUser extends BaseComponent implements OnInit {
  emailid: string | null;
  userId : number | null;


  form: FormGroup = new FormGroup({
    emailID: new FormControl(''),
    userName: new FormControl(''),
    userStatus: new FormControl(''),
    userRole: new FormControl('')
  });

  constructor(private cdr: ChangeDetectorRef,public router: Router, public activeRouter: ActivatedRoute ) {
    super();
  }

  onPageReady(pageConfig: any): void {
   console.log('onPageReady--')
   this.dataService.getService('usersByEmail' , { 'email' :this.emailid})
    .subscribe((response: any) =>{
      this.userId = response.userId;
      this.form.controls['userName'].setValue(response.username);
      this.form.controls['emailID'].setValue(response.email);
      this.form.controls['userStatus'].setValue(response.eff_status);
      this.form.controls['userRole'].setValue(response.admin_role);

      
    });
  }

  ngOnInit(): void {
    this.emailid = this.activeRouter.snapshot.paramMap.get('id')

  }
  ngOnChanges() {
   
  }

  updateUser(){
    let jsonData = {
      'userId' : this.userId,
      'username': this.form.controls['userName'].value, 
    'email' : this.form.controls['emailID'].value,
    'eff_status' : this.form.controls['userStatus'].value,
    'admin_role' : this.form.controls['userRole'].value,
  };
  console.log(jsonData)
 
  let postService = this.dataService.postService('updateuser',jsonData);

  postService.subscribe({
    next: (response) => {
     
      this.router.navigate(['/userlist']);
      
     
    },
    error: (e) => {
      //this.errorx = e.error.message; 
      //this.cdr.markForCheck();
    }
   
  });
 
    
  }
}

