import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from "@auth0/angular-jwt";


//Import Modules
import {MaterialModule} from './modules/material.module';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserregisterComponent } from './components/userregister/userregister.component';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { IsloginGuard } from './gaurds/islogin/islogin.guard';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { CreatepostComponent } from './components/admin/blogpost/createpost/createpost.component';
import { EditpostComponent } from './components/admin/blogpost/editpost/editpost.component';
import { AllpostsComponent } from './components/admin/blogpost/allposts/allposts.component';
import { UpdatepasswordComponent } from './components/admin/updatepassword/updatepassword.component';
import { EditprofileComponent } from './components/admin/editprofile/editprofile.component';
import { UserService } from './_services/user/user.service';
import { TokenverifyService } from './_services/tokenverify/tokenverify.service';
import { BytesPipe } from './pipes/BytesPipe/bytes.pipe';
import { MaterialFileUploadComponent } from './components/shared/material-file-upload/material-file-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    UserregisterComponent,
    HomeComponent,
    NotfoundComponent,
    CreatepostComponent,
    EditpostComponent,
    AllpostsComponent,
    UpdatepasswordComponent,
    EditprofileComponent,
    BytesPipe,
    MaterialFileUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem("token");
      },
        whitelistedDomains: ["http://localhost:4000/api/"],
        skipWhenExpired:true
      },
    }),
  ],
  providers: [UserService, IsloginGuard,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenverifyService,
      multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
