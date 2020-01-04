import { Component, OnInit, TemplateRef } from '@angular/core';
import { TourService } from 'src/app/shared/services/tour.service';
import { TourModel } from 'src/app/shared/models/tour.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { AddTicketModel } from 'src/app/shared/models/add-ticket.model';
import { TicketService } from 'src/app/shared/services/ticket-service.service';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit {

  constructor(private modalService: BsModalService,private tourSrvice: TourService,
    private toastr: ToastrService, private ticketService : TicketService) { }
  modalRef: BsModalRef;
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  tour: TourModel = new TourModel();

  ngOnInit() {
    this.initTour();
  }

  initTour() {
    let tourId = localStorage.getItem('tourId');
    this.tourSrvice.getTour(tourId).subscribe(
      (data: TourModel) => {
        this.tour = data;
      },
      (error: HttpErrorResponse) => {
        this.toastr.error(error.message);
      }
    )
  }

  addTicket(){
    let ticket = new AddTicketModel();
    ticket.tourId = this.tour.id;
    ticket.userId = localStorage.getItem('UserId');
    this.ticketService.addTicket(ticket).subscribe(
      (data: any) => {
        this.modalRef.hide();
        this.toastr.success("ticket added");
        this.initTour();
      },
      (error: HttpErrorResponse) => {
        this.toastr.error(error.message);
      }
    )
  }

}
