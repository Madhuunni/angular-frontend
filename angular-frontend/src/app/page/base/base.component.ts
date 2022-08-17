
import { Component , OnInit} from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { forkJoin } from 'rxjs';

@Component({
	selector : 'app-base-x',
    template: ``,
    styles: []
})

export abstract class BaseComponent{
	
	pageId : string;
	public dataService : DataService = new  DataService();
	constructor(){
		if(this.pageId){
			this.getPageConfig().subscribe((response: any) =>{
				
				this.onPageReady(JSON.parse(response.pageConfig));
			});
		}
	}

	abstract onPageReady(jsonConfig : any) : void;
   
	getPageConfig(){
		return this.dataService.getConfig(this.pageId);
	}

	loadPageData(transCall : any[]){
		let pageData = [this.getPageConfig()];
		pageData = pageData.concat(transCall);

		return forkJoin(pageData);
	}


}

export function PageConfig(config : any){
	return function (target : any){
		Object.defineProperty(target.prototype, 'pageId', {value : config.pageId})
	}
}