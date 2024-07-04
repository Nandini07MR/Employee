import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: FormGroup|any;
  constructor(private http:HttpClient,private _router:Router){}
  ngOnInit(): void {
    this.login=new FormGroup({
      'email':new FormControl(),
      'password':new FormControl()
    })
  }
  logindata(){
console.log(this.login.value);
this.http.get<any>('http://localhost:3000/posts').subscribe(res=>{
  const user =res.find((a:any)=>{
    return a.email===this.login.value.email && a.password=== this.login.value.password
  });
  if(user){
    alert('you are successsfully login')
    this.login.reset();
    this._router.navigate(['/home'])
  }else{
    alert('user not found');
    this._router.navigate(['/login'])
  }
},error=>{
  alert('something went wrong')
})
  }
 

 
}
