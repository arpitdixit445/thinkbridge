import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from 'src/app/services/loader.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.scss']
})
export class AddRestaurantComponent implements OnInit {

  addForm:FormGroup;

  constructor(private restaurantService:RestaurantService,private fb:FormBuilder,private loaderService:LoaderService) { 
    this.addForm = this.fb.group({
      id:[''],
      name:['',[Validators.required]],
      cuisine:['',[Validators.required]],
      description:['',[Validators.required]],
      location:['',[Validators.required]],
      nonveg:[false],
      bar:[false],
      dishes:['']
    })
  }

  ngOnInit(): void {
    if(this.restaurantService.editData != undefined){
      this.addForm.setValue(this.restaurantService.editData);
      this.restaurantService.editData = undefined;
    }
  }

  back(){
    this.restaurantService.signedIn(undefined);
  }
  onAdd(){
    this.loaderService.turnLoaderOn$.next(true);
    this.restaurantService.addRestaurant({...this.addForm.value,username:localStorage.getItem('token_username')}).subscribe(resp=>{
      console.log(resp)
      this.loaderService.turnLoaderOn$.next(false)
      this.restaurantService.signedIn(undefined);
    })
  }


  checkErrors(name:string,fg:FormGroup){
    if(fg.controls[name].touched && fg.controls[name].errors != undefined){
      return true
    }
    return false
  }

}
