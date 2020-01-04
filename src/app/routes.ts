import {Routes} from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ToursComponent } from './components/tours/tours.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { TourComponent } from './components/tour/tour.component';


export const appRoutes: Routes=[
    {path:'', component:LandingComponent},
    {path:'profile/:id', component:ProfileComponent},
    {path:'tours', component:ToursComponent},
    {path:'tour/:id', component:TourComponent},
    {path:'admin', component:AdminPageComponent}
]