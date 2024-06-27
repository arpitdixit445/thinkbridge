import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private restaurantService:RestaurantService) { }

  userData:any;
  username:string|null = "";

  restaurants = [ ]

  ngOnInit(): void {
    this.userData = this.restaurantService.userData;
    this.restaurantService.restaurants$.subscribe(resp=>{
      this.restaurants = Object.values(resp);
    })
    if(this.userData == undefined){
      this.username = localStorage.getItem('token_username');
      if (this.username == undefined) {
        this.restaurantService.logout()
      } else {
        this.restaurantService.getUser({username:this.username}).subscribe((res:any)=>{
          this.userData = res
          this.restaurantService.userData = res
          this.restaurants = Object.values(res['restaurants']);
        },
      (err)=>{
      })
      }
  }
  else{
    this.username = this.userData.username 
  }
  }

  addRest(){
    this.restaurantService.addRestaurantRedirect();
  }


}
