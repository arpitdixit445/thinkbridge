import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, delay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  

  constructor(private http:HttpClient,private router:Router,private loaderService:LoaderService) { }

  userData:any;
  editData:any;

  restaurants$:Subject<any> = new Subject();

  login(payload:any){
    return this.http.post(`${environment.apiURL}/login`,payload);
  }

  register(payload:any){
    return this.http.post(`${environment.apiURL}/register`,payload);
  }

  getUser(payload:any){
    return this.http.post(`${environment.apiURL}/getuser`,payload);
  }

  signedIn(data:any){
      this.userData = data;
      this.router.navigate(['/dashboard']);
  }

  logout() {
    this.router.navigate(['/login']);
  }

  addRestaurantRedirect(){
    this.router.navigate(['/addrestaurant']);
  }

  addRestaurant(payload:any){
    return this.http.post(`${environment.apiURL}/addRestaurant`,payload);
  }

  editDataRedirect(payload:any){
    this.editData = payload;
    this.router.navigate(['/addrestaurant']);
  }

  deleteRestaurant(payload:any){
    return this.http.post(`${environment.apiURL}/deleteRestaurant`,payload)
  }
}
