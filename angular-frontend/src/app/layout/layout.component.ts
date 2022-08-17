
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Menu } from './menu.model';
import { AppUtil } from '../util/app.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  opened = true;
  isUserLoggedin = false;

  constructor(private appUtil : AppUtil) { 
    this.isUserLoggedin=appUtil.isUserLoggedin();
  }

  
  ngDoCheck () : void {
    this.isUserLoggedin=this.appUtil.isUserLoggedin();
  }
  

  toggle(): void {
    this.opened = !this.opened;
  }

  menu: Menu = [
    {
      title: 'Dashboard',
      icon: 'home',
      link: '/dashboard',
      color: '#ff7f0e'
    },
    {
      title: 'Activities',
      icon: 'local_activity',
      link: '/activities',
      color: '#ff7f0e'
    },
    {
      title: 'Case Mgmt',
      icon: 'work',
      link: '/activities',
      color: '#ff7f0e'
    },
    {
      title: 'Reports',
      icon: 'receipt',
      link: '/activities',
      color: '#ff7f0e'
    },
    {
      title: 'Config',
      icon: 'ac_unit',
      link: '/activities',
      color: '#ff7f0e'
    },

    {
      title: 'Access',
      icon: 'bar_chart',
      color: '#ff7f0e',
      subMenu: [
        {
          title: 'User Management',
          icon: 'supervised_user_circle',
          link: '/userlist',
          color: '#ff7f0e',
        },
        {
          title: 'Client Management',
          icon: 'people',
          color: '#ff7f0e',
          link: '/customers',
        },
      ],
    },

    {
      title: 'Admin',
      icon: 'dialpad',
      color: '#ff7f0e',
      subMenu: [
        {
          title: 'Manage HRMS',
          icon: 'turned_in',
          link: '/sales',
          color: '#ff7f0e',
        },
        {
          title: 'Manage CRM',
          icon: 'vertical_split',
          color: '#ff7f0e',
          link: '/customers',
        },
        {
          title: 'Role Management',
          icon: 'album',
          color: '#ff7f0e',
          link: '/customers',
        },
        {
          title: 'Page Composer',
          icon: 'pages',
          color: '#ff7f0e',
          link: '/customers',
        },
      ],
    },
  ];
}
