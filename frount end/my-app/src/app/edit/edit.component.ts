import { Component,OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { Router } from '@angular/router';
import { MyServiceService } from '../my-service.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  public loginForm!: FormGroup; 
  hide = true;
  constructor(private fb :FormBuilder,private http : HttpClient,private router:Router,private service: MyServiceService){}
  ngOnInit():void{
    this.loginForm= this.fb.group({
      Name: ['',Validators.required],
      ID: ['']
    })
  }
  getErrorMessage(){
    console.log("invalid");
  }
  async submite(value:any){
    const student:any  =await this.service.get().toPromise();
    for(let i=0;i<student.length;i++){
    if((value.ID==student[i].id)&&(value.Name == student[i].stName)){

      this.router.navigate(['studentlist'])
    }
    }
  }
}
