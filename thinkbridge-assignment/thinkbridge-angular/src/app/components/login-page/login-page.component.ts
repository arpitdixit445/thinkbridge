import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { CustomValidators } from './validators';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit,AfterViewChecked {

  constructor(private restaurantService:RestaurantService,private fb:FormBuilder,private readonly changeDetectorRef: ChangeDetectorRef,private loaderService:LoaderService) {

    this.loginForm = this.fb.group({
      username:['',[Validators.required,CustomValidators.noSpaces,CustomValidators.minLength]],
      password:['',[Validators.required,CustomValidators.noSpaces,CustomValidators.minLength]]
    })
    this.registerForm = this.fb.group({
      firstname:['',[Validators.required,CustomValidators.noSpaces]],
      lastname:['',[Validators.required,CustomValidators.noSpaces]],
      username:['',[Validators.required,CustomValidators.noSpaces,CustomValidators.minLength]],
      password:['',[Validators.required,CustomValidators.noSpaces,CustomValidators.minLength]],
      repassword:['',[Validators.required,CustomValidators.noSpaces]]
    })
   }

  pageType:boolean = true;
  loginForm:FormGroup;
  registerForm:FormGroup;

  ngOnInit(): void {
    const userData = localStorage.getItem('token_username')
    console.log(userData)
    if(userData != undefined){
      this.restaurantService.signedIn(undefined);
    }

  }

  switchPage(){
    this.pageType = !this.pageType;
  }

  onLogin(){
    this.loaderService.turnLoaderOn$.next(true);
    this.restaurantService.login(this.loginForm.value).subscribe((res:any)=>{
    this.loaderService.turnLoaderOn$.next(false);
    localStorage.setItem('token_username',res.username)
    this.restaurantService.signedIn(res)
    },
  (err)=>{
    this.loaderService.turnLoaderOn$.next(false);
    window.alert(err.error)
  })
  }

  onRegister(){
    this.restaurantService.register(this.registerForm.value).subscribe((res:any)=>{
      this.loaderService.turnLoaderOn$.next(false);
    localStorage.setItem('token_username',res.username)
      this.restaurantService.signedIn(res)
    },
    (err)=>{
      this.loaderService.turnLoaderOn$.next(false);
      window.alert(err.error)
    })
  }

  checkErrors(name:string,fg:FormGroup){
    if(fg.controls[name].touched && fg.controls[name].errors != undefined){
      return true
    }
    return false
  }

  displayError(name:string,fg:FormGroup){
    if(fg.controls[name].errors != undefined){
      return Object.values(fg.controls[name].errors as Object)[0] === true ? `${name} can not be Empty` : `${name} ${Object.values(fg.controls[name].errors as Object)[0]}`;
    }
    return ""
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

}
