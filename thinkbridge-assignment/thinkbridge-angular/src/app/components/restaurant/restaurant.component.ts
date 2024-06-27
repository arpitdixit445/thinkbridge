import { Component, Input, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {

  constructor(private restaurantService:RestaurantService) { }

  @Input('restaurantData')data:any;

  ngOnInit(): void {
  }

  onEdit(){
    console.log("here")
    this.restaurantService.editDataRedirect(this.data);
  }


  delete(id:any):any{
    this.restaurantService.deleteRestaurant({id,username:localStorage.getItem('token_username')}).subscribe((resp:any)=>{
      this.restaurantService.restaurants$.next(resp);
    })
  }

}
