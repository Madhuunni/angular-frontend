import { Component, Input, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { HttpClient, HttpParams, HttpXhrBackend } from '@angular/common/http';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent {

  @Input() serviceName : string ;
  @Input() serviceParam : string ;
  @Input() serviceConfig : string ;

  rawData: any[] = [];
  tableConfig: any[] = [];
  tableColumns : string[] = [];
  loading: boolean = true;
  dataSource = new MatTableDataSource<any>();
  dataService : DataService = new  DataService();

 
  @ViewChild(MatPaginator) paginator: MatPaginator;
 

  constructor() {
   
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if(this.serviceParam) 
      this.getData();
  }

  applyConfig(tableData : any[]){
    this.tableConfig = JSON.parse(this.serviceConfig);
    this.tableColumns = [];
    let hideColumns : string[] = [];

    for(let jConfig of Object.values(this.tableConfig)){
      if(jConfig['hidden'] == 'true'){
        hideColumns.push(jConfig['columnKey']);
      }			
    }

    for(let json of Object.values(tableData)){
      for(let hCol of hideColumns){
        delete json[hCol];
      }
    }

    for(let json of Object.values(this.tableConfig)){
      if(!hideColumns.includes(json['columnKey']))
        this.tableColumns.push(json['columnKey']);
    }
   
    return tableData;
  }

  getData(){
    
    let param = JSON.parse(this.serviceParam);
    this.dataService.getService(this.serviceName , param)
    .subscribe((response: any) =>{

      // console.log(response) 
      this.loading = false;
      this.rawData = this.applyConfig(response.content);
      
      this.rawData.length = response.totalElements;

      this.dataSource = new MatTableDataSource<any>(this.rawData);
      this.dataSource.paginator = this.paginator;
    })
  }

  getNextData(currentSize : number, offset : number, limit : number){
    let param = JSON.parse(this.serviceParam);
    param.pageIndex = offset;
    param.pageSize = limit;
    this.dataService.getService(this.serviceName ,param)
    .subscribe((response: any) =>{

      this.loading = false;

      this.rawData.length = currentSize;
      this.rawData.push(...this.applyConfig(response.content));

      this.rawData.length = response.totalElements;

      this.dataSource = new MatTableDataSource<any>(this.rawData);
      this.dataSource._updateChangeSubscription();

      this.dataSource.paginator = this.paginator;
  
    })
  }

  pageChanged(event : any){
    this.loading = true;

    let pageIndex = event.pageIndex;
    let pageSize = event.pageSize;

    let previousIndex = event.previousPageIndex;

    let previousSize = pageSize * pageIndex;

    this.getNextData(previousSize, (pageIndex).toString(), pageSize.toString());
  }

  getRecord(xx : any){
    console.log(xx)

  }

  getAdminUserVal(row : any,value : any){
    console.log('getAdminUserVal--');
  }

  processValue(row : any,value : any){
    
    return true;
  }
}