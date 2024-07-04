import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  displayedColumns: string[] = ['id', 'employee_name', 'employee_salary', 'employee_age', 'profile_image'];
  dataSource: MatTableDataSource<EmployeeData>;
 
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
 
private apiUrl = 'https://dummy.restapiexample.com/api/v1/employees';  // Replace with your API URL
 
  constructor(private http: HttpClient) {
    this.dataSource = new MatTableDataSource();
  }
 
  ngOnInit() {
    this.getEmployees().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
 
  getEmployees(): Observable<EmployeeData[]> {
    return this.http.get<EmployeeData[]>(this.apiUrl);
  }
 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
 
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
