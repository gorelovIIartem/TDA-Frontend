import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {AuthInterceptor} from "./auth/auth.interceptor";

import { AppRoutingModule } from './app-routing.module';
import { appRoutes } from './routes';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingComponent } from './components/landing/landing.component';
import { ProfileComponent } from './components/profile/profile.component';

import { BsDatepickerModule, CollapseModule, ModalModule} from 'ngx-bootstrap'
import { ToastrModule } from 'ngx-toastr';
import { NgxBootstrapSliderModule } from 'ngx-bootstrap-slider';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FontAwesomeModule } from 'ngx-icons';


import { RoleService } from './shared/services/role.service';
import { ToursComponent } from './components/tours/tours.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { TourComponent } from './components/tour/tour.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingComponent,
    ProfileComponent,
    ToursComponent,
    AdminPageComponent,
    TourComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CollapseModule.forRoot(),
    BrowserAnimationsModule,
    NgxBootstrapSliderModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    ToastrModule.forRoot({
      preventDuplicates : false
    }),
    RouterModule.forRoot(appRoutes),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule.forRoot(),
    FontAwesomeModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
