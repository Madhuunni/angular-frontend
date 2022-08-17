import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BaseComponent, PageConfig } from '../base/base.component';
import { Router } from '@angular/router';

@Component({
  template: `
    <app-page-header icon="supervised_user_circle">
      <h2>User Management</h2>
    </app-page-header>


      <div fxLayout="row" >
        
        <mat-card fxFlex="30" style="margin : 0px 20px 0px 20px">
                <mat-card-title>Search</mat-card-title>
          <mat-card-content>
            <form [formGroup]="form" (ngSubmit)="search()">
              <p>
                <mat-form-field fxFlex >
                  <input type="text" matInput placeholder="Email ID" formControlName="emailID">
                </mat-form-field>
              </p>
              <p>
                <mat-form-field fxFlex >
                  <input type="text" matInput placeholder="Emplyee Name" formControlName="employeeName">
                </mat-form-field>
              </p>

              
              <button type="submit" mat-raised-button color="primary">Search</button>
             
            </form>
          </mat-card-content>
        </mat-card>

        <div fxLayout="column" fxFlex="70" >    
          <button type="button" mat-raised-button color="primary" 
          (click)="this.router.navigate(['/createuser']);"
            style="margin-bottom : 20px;width : 120px">Create User</button>
          <div  fxLayoutAlign="center">
            <app-table-list 
              serviceName="userSearch"
              serviceParam="{{ serviceParam }}"
              serviceConfig = "{{ serviceConfig }}"
            fxFlex ></app-table-list>
          </div>
        </div>
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

export class UserList extends BaseComponent implements OnInit {

  serviceParam : string = '' ;
  serviceConfig : string = '' ;
  form: FormGroup = new FormGroup({
    emailID: new FormControl(''),
    employeeName: new FormControl(''),
  });

  constructor(private cdr: ChangeDetectorRef,public router: Router) {
    super();
  }

  onPageReady(pageConfig: any): void {
    
    this.serviceParam = '{"pageIndex":0,"pageSize":5}';
    this.serviceConfig =JSON.stringify(pageConfig);
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
      
  }
  ngOnChanges() {
   
  }

  search(){

    let paramJSON = {"pageIndex": 0, 
    "pageSize": 5, 
    "email" : this.form.controls['emailID'].value,
    "name" : this.form.controls['employeeName'].value };
    
    this.serviceParam=JSON.stringify(paramJSON)
   
  }


}

