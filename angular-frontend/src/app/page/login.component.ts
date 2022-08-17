import { Input, Component, ChangeDetectorRef, EventEmitter, OnInit  } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BaseComponent } from "./base/base.component";
import { Router } from '@angular/router';



@Component({
  selector: 'my-login',
  template: `
      <mat-card>
            <mat-card-title>Login</mat-card-title>
      <mat-card-content>
        <form [formGroup]="form" (ngSubmit)="logon()">
          <p>

            <mat-form-field >
            <mat-label>Username</mat-label>
              <input matInput placeholder="Username" formControlName="username">
              <mat-icon matSuffix>account_circle</mat-icon>
             
            </mat-form-field>
          </p>
          
          <p>
            <mat-form-field>
              <mat-label>Password</mat-label>
              <input matInput type="password" placeholder="Password" formControlName="password">
              <mat-icon matSuffix>visibility_off</mat-icon>
              
            </mat-form-field>
          </p>

          <p *ngIf="errorx" class="error">
            {{ errorx }}
          </p>

          <div class="button">
            <button type="submit" mat-raised-button color="primary">Login</button>
          </div>

        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      :host {
        display: flex;
        justify-content: center;
        margin: 100px 0px;
      }

      .mat-form-field {
        width: 100%;
        min-width: 300px;
      }

      mat-card-title,
      mat-card-content {
        display: flex;
        justify-content: center;
      }

      .error {
        padding: 16px;
        width: 300px;
        color: white;
        background-color: red;
      }

      .button {
        display: flex;
        justify-content: flex-end;
      }
    `,
  ],
  
})


export class LoginComponent extends BaseComponent  implements OnInit {

  @Input() errorx: string = '';
  constructor(private router: Router,private cdr: ChangeDetectorRef){
    super();
    this.clearLocalStorage();
	}

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit() {
   
  }

  logon() {

    let jsonData = {'username': this.form.controls['username'].value, 
                  'password' : this.form.controls['password'].value };
    let authService = this.dataService.getAuth(jsonData);

    authService.subscribe({
      next: (response) => {
        localStorage.setItem('token',response.jwt);
        localStorage.setItem('userName', response.userName);
        console.log(localStorage.getItem('userName'));

        this.router.navigate(['dashboard']);
       
      },
      error: (e) => {
        this.errorx = e.error.message; 
        this.cdr.markForCheck();
      }
     
    });
  }

  clearLocalStorage(){
    localStorage.setItem('token','');
    localStorage.setItem('userName', '');
  }

  onPageReady(jsonConfig: any): void {
  }

  logout() {
    this.clearLocalStorage();
  }
  
 
}

