import { Component, OnInit } from '@angular/core';
import { TourService } from 'src/app/shared/services/tour.service';
import { TourModel } from 'src/app/shared/models/tour.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css']
})
export class ToursComponent implements OnInit {

  constructor(private router: Router, private tourService: TourService, private toastr: ToastrService) { }

  tours: TourModel[] = [];

  ngOnInit() {
    this.initTours();
  }

  initTours() {
    this.tourService.getAllTours().subscribe(
      (data: TourModel[]) => {
        this.tours = data;
      },
      (error: HttpErrorResponse) => {
        this.toastr.error(error.message);
      }
    )
  }

  goToTour(tourId: number){
    localStorage.setItem('tourId', tourId.toString());
    this.router.navigate(["/tour/" + tourId]);
  }


}
