import { Injectable } from "@angular/core";

@Injectable()
export class AppUtil {
	
	constructor(){
	}

	isUserLoggedin() {
		if (localStorage.getItem('token') != null && localStorage.getItem('token') != '' 
			&& localStorage.getItem('userName') != null && localStorage.getItem('userName') != '') {
		  	return true;
		} else {
		  	return false;
		}
	}

	getUserName(){
		return localStorage.getItem('userName')
	}

}