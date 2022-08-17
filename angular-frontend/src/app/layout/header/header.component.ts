import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Output,
    OnInit,
    
    ChangeDetectorRef
  } from '@angular/core';
  
  import { AppUtil } from '../../util/app.service';

  @Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })


  export class HeaderComponent  implements OnInit {
    @Output() menuToggled = new EventEmitter<boolean>();
    
    user: string = '';
  
    constructor(private appUtil : AppUtil,private cdr: ChangeDetectorRef) { 

    }

    ngOnInit() {
      
    }

    ngDoCheck () : void {
      let userName = this.appUtil.getUserName();
      this.user = (userName == null) ? '' :userName;
      this.cdr.markForCheck();
    }

  
    logout(): void {
      
    }
  }
  