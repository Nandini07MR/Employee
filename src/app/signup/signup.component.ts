import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  constructor(private _router:Router,private _http:HttpClient,private fb:FormBuilder){}
    signup:FormGroup|any;
    signuser:any;
    ngOnInit(): void {
      this.signup=new FormGroup({
        'firstname':new FormControl(),
        'lastname':new FormControl(),
        'email':new FormControl(),
        'password':new FormControl()
    })
    

    // signupdata(){
    this.signup = this.fb.group({
      'firstname': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{5,}$/)]],
      'lastname': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{5,}$/)]]
    })
  }
    signupdata(){
      console.log(this.signup.value)
      this.signuser=this.signup.value.firstname
      this._http.post<any>("http://localhost:3000/posts", this.signup.value).subscribe(res=>{
        alert('signup successfull')
        this.signup.reset();
     
      },
      error=>{
        alert('something went wrong');
      }
      )
    }
   
}
