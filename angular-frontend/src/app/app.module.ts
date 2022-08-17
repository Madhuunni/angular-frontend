import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';

import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './page/home.component';
import { UserList } from './page/usermanagement/userlist.component';
import { CreateUser } from './page/usermanagement/createuser.component';
import { UpdateUser } from './page/usermanagement/updateuser.component';


import { DashboardComponent } from './page/dashboard.component';

import { HeaderComponent } from './layout/header/header.component';
import { MenuItemComponent } from './layout/menu-item/menu-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SalesComponent } from './page/sales.component';
import { PageHeaderComponent } from './layout/page-header.component';

import { AppUtil } from './util/app.service';

import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { LoginComponent } from './page/login.component';
import { TableListComponent } from './ui-component/table-list/table-list.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: '',
    component: LayoutComponent,

    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'userlist',
        component: UserList
      },
      {
        path: 'createuser',
        component: CreateUser
      },
      
      {
        path: 'updateuser/:id',
        component: UpdateUser
      },
      {
        path: 'sales',
        component: SalesComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    RouterModule.forRoot(routes),
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,
    FlexLayoutModule ,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    MenuItemComponent,
    PageHeaderComponent,
    HomeComponent,
    DashboardComponent,
    SalesComponent,
    LoginComponent,
    UserList,
    CreateUser,
    UpdateUser,
    TableListComponent
  ],
  providers : [AppUtil],
  bootstrap: [AppComponent]
})
export class AppModule {}
