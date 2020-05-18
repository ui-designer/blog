import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { HomeComponent } from './components/home/home.component';
import { UserregisterComponent } from './components/userregister/userregister.component';
import { AllpostsComponent } from './components/admin/blogpost/allposts/allposts.component';
import { CreatepostComponent } from './components/admin/blogpost/createpost/createpost.component';
import { EditpostComponent } from './components/admin/blogpost/editpost/editpost.component';
import { UpdatepasswordComponent } from './components/admin/updatepassword/updatepassword.component';
import { EditprofileComponent } from './components/admin/editprofile/editprofile.component';
import { IsloginGuard } from './gaurds/islogin/islogin.guard';


const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'userregister', component:UserregisterComponent},
  {path:'dashboard', canActivate:[IsloginGuard], children:[
    {path:'', component:DashboardComponent},
    {path:'allposts', component:AllpostsComponent},
    {path:'createpost', component:CreatepostComponent},
    {path:'editpost', component:EditpostComponent},
    {path:'editprofile', component:EditprofileComponent},
    {path:'update', component:UpdatepasswordComponent},
  ]},
  {path:'**', component:NotfoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
