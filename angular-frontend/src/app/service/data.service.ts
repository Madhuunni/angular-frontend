
import { HttpClient,HttpParams,HttpXhrBackend, HttpHeaders   } from '@angular/common/http';

export class DataService {
	
	serviceUrl : string = "http://localhost:8080";
	httpClient : HttpClient;
	constructor(){
		this.httpClient = new HttpClient(new HttpXhrBackend({ 
			build: () => new XMLHttpRequest() 
		}));
	}

	getAuth(jsonData : any){
		return this.httpClient.post<any>(this.serviceUrl + '/authenticate', jsonData, {
			headers: new HttpHeaders().set('Content-Type', 'application/json')
		  });
	}

    getConfig(pageId : string){
		return this.httpClient.get<any>(this.serviceUrl + '/config?pageId='+pageId , 
				this.getTokenHeader());
	}

	getTokenHeader() {
		let token = localStorage.getItem('token');
		let headersX = new HttpHeaders().set('Authorization','Bearer '+token);
		headersX = headersX.append('Content-Type',  'application/json');

		return {headers: headersX};
	  }

	getService(serviceName : string,serviceParam : any){
		let header = this.getTokenHeader();
		let reqParam = '';

		if(serviceParam){

			Object.keys(serviceParam).forEach(function (key) {
				if(reqParam.length > 0) 
					reqParam = reqParam + '&'
				reqParam = reqParam + key + '=' + serviceParam[key];
		   });
		   
		}
		let service = this.serviceUrl + '/' + serviceName + '?' + reqParam;
		return this.httpClient.get<any>(service , header );
	}

	postService(serviceName : string,serviceParam : any){
		return this.httpClient.post<any>(this.serviceUrl + '/' + serviceName , 
					serviceParam, this.getTokenHeader());

	}

}