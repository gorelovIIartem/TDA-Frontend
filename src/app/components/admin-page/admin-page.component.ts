import { Component, OnInit, TemplateRef } from '@angular/core';
import { TourModel } from 'src/app/shared/models/tour.model';
import { TourService } from 'src/app/shared/services/tour.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor(private modalService: BsModalService, private tourService: TourService, private toastr: ToastrService) { }

  modalRef: BsModalRef;
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  newTour: TourModel = new TourModel();
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

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.newTour = new TourModel();
  }

  onAddTourFormSubmit(form: NgForm) {
    this.tourService.addTour(form.value)
      .subscribe((data: any) => {
        if (data.Succeeded) {
          this.resetForm(form);
          this.modalRef.hide();
          this.initTours();
          this.toastr.success(data.Message);
        }
      },
        (error: HttpErrorResponse) => {
          if (error.status === 400 && error.error.ModelState !== undefined) {
            for (let key in error.error.ModelState)
              for (let i = 0; i < error.error.ModelState[key].length; i++)
                this.toastr.error(error.error.ModelState[key][i]);
          } else if (error.status === 400) {
            this.toastr.error(error.error.Message);
          } else {
            this.toastr.error("Cannot add tour!");
          }
        });
  }


  isShow(){
      let isShow: Boolean;
    if (this.tours.length!==0) {
      isShow = true;
    }
    else {
      isShow = false;
    }
    console.log(isShow);
    return isShow;
  }

}
