import { HttpClient } from '@angular/common/http';
import {Component,Inject,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})

export class StudentFormComponent implements OnInit {
  
   userid:any=null;
   options =["Male","Female"];

   studentForm:any = this.fb.group({
    Name : ['',Validators.required],
    Course : ['',Validators.required],
    Fees : ['',Validators.required],
    Sex : ['',Validators.required]
  });
  constructor(private fb:FormBuilder,public http:HttpClient,private route:ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data :any,public dialogRef: MatDialogRef<StudentFormComponent>
    ){}
  ngOnInit(): void{
    // this.userid = this.route.snapshot.paramMap.get('id');
    // this.userid =Number(this.userid);
    // if(this.userid!=null){
      // this.http.get(`http://localhost:8085/api/student/${this.userid}`).subscribe((user:any) =>{
      //     const Name = user[0].stName;
      //     const Course = user[0].course;
      //     const Fees = user[0].fees;
      //     const Sex = user[0].Sex;
      //     this.selectedOption = Sex; 
      //   this.studentForm.patchValue({
      //     Name:Name,
      //     Course:Course,
      //     Fees:Fees,
      //     Sex:Sex
      //   });
      // })
      let data:any = localStorage.getItem('data');
          data = JSON.parse(data);
          console.log(data)
      // for( let i=0;i<data.length;i++){
      //   if(this.userid == data[i].id){
          this.studentForm.patchValue({
            Name:data.stName,
            Course:data.course,
            Fees:data.fees,
            Sex:data.Sex
          })
        // }
      // }
      // this.studentForm.patchValue({
      //       Name:this.data.Name,
      //       Course:this.data.Course,
      //       Fees:this.data.Fees,
      //       Sex:this.data.Sex
      //     });
          

    
  };
  
  closeDialog(value:any) {
    
    if(this.data){this.http.put(`http://localhost:8085/api/student/update/${this.data.id}`,value).subscribe((res)=>{
      window.alert("your data edited");
      
    })
    this.dialogRef.close(value);
  }
    else{
      this.http.post("http://localhost:8085/api/student/add",value).subscribe(res =>{
        // console.log(res) ;
        
      });
      this.dialogRef.close();
      // this.http.get("http://localhost:8085/api/student").subscribe(res =>{
      //   value = res;
      //  
      // })
    }
   
    
  }

  onsubmit(){
    if(this.userid== 0){
      const data = this.studentForm.value
      this.http.post("http://localhost:8085/api/student/add",data).subscribe(responce =>{
        window.alert("Form is submited");
        window.location.reload();
      })
    } else{
      const data = this.studentForm.value
      console.log(this.userid);
      this.http.put(`http://localhost:8085/api/student/update/${this.userid}`,data).subscribe((res)=>{
        window.alert("your data edited");
      })

      }
    }
    
  }

