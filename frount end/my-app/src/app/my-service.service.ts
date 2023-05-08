import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {
private apiUrl ='http://localhost:8085/api/student';
public  data:any;
  constructor(private http:HttpClient) { }
  Put(){

  }
  PostbyId(){

  }
   get(){
   return this.http.get(this.apiUrl)                
  }

  getbyId(studentId:any){

  }

  delete(id:any){
    return this.http.delete(`${this.apiUrl}/delete/${id}`)
  }
}
