import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {MatDialog, MatDialogRef,MatDialogConfig } from '@angular/material/dialog';
import { StudentFormComponent } from '../student-form/student-form.component';
import { MyServiceService } from '../my-service.service';



@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css']
})
export class StudentlistComponent {
  public studentList :any;
  public studentdata:any ;

  displayedColumns: string[] = ['id', 'stName', 'course', 'fees','Sex','Action'];

  constructor(public http:HttpClient,public dialog: MatDialog,private service: MyServiceService){};

  ngOnInit():void{
     this.getdata();
     
  }
  async openDialog(studentId:any) {
    
    try {
      const user: any = await this.http.get(`http://localhost:8085/api/student/${studentId}`).toPromise();
      this.studentdata = user[0];
      console.log(this.studentdata);
      localStorage.setItem('data',JSON.stringify(this.studentdata));
    } catch (error) {
      console.error(error);
    }
    const dialogRef = this.dialog.open(StudentFormComponent,{
      width:'300px',
      // data:{Name:this.studentdata.stName,
      //       Course:this.studentdata.course,
      //       Fees:this.studentdata.fees,
      //       Sex:this.studentdata.Sex,
      //       id:studentId
      // }
    });
    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
      localStorage.clear();
      
    });

  }
  add(){
    const dialogRef = this.dialog.open(StudentFormComponent,{
      width:'300px'
    });
    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
      localStorage.clear();
    })
  }

  
  async getdata(){
    this.studentList  =await this.service.get().toPromise();
  }

  async ondelete(elementid:any){
    if(window.confirm("can i delete this coloum?")){
     await this.service.delete(elementid).toPromise();
     window.location.reload();
    }
   
   
  }
}
