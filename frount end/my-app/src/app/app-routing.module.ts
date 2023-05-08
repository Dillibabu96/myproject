import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EditComponent } from './edit/edit.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentlistComponent } from './studentlist/studentlist.component';

const routes: Routes = [
  {path:'student-form/:id',component:StudentFormComponent},
  {path:'login',component:EditComponent},
  {path: 'student-form' , component:StudentFormComponent},
  {path: 'studentlist' , component:StudentlistComponent},
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
