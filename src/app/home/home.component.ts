import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

export interface EmployeeData{
  id:number;
  employee_name:string;
  employee_salary:number;
  employee_age:number;
  profile_image:string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HOMEComponent implements OnInit{
 
 
private apiUrl = 'https://jsonplaceholder.typicode.com/users';  
data!:any[]
 
  constructor(private http: HttpClient) {
    
  }
 
  ngOnInit() {
    this.getEmployees().subscribe((data:any) => {
      console.log(data)
      this.data= data
     
    });
  }
 
  getEmployees(): Observable<EmployeeData[]> {
    return this.http.get<EmployeeData[]>(this.apiUrl);
  }
 
 
}
