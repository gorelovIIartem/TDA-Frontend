import { Component, TemplateRef, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Toast, ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { TourModel } from 'src/app/shared/models/tour.model';
import { TourService } from 'src/app/shared/services/tour.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService, private toastr: ToastrService,
    private modalService: BsModalService, private tourService: TourService, private router: Router) { }

  modalRef: BsModalRef;
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  user: User = new User();
  birhtday: String = new String();
  tours: TourModel[] = [];
  

  ngOnInit() {
    this.initUser();
    this.initTours();
  }

  initUser() {
    let userId = localStorage.getItem('UserId');
    this.userService.getUserById(userId).subscribe(
      (data: User) => {
        this.user = data;
        this.getDate();
      },
      (error: HttpErrorResponse) => {
        this.toastr.error(error.message);
      }
    )
  }

  getDate() {
    this.birhtday = this.user.birthday.toString().substr(8, 2) + '/'
      + this.user.birthday.toString().substr(5, 2) + '/'
      + this.user.birthday.toString().substr(0, 4)
  }

  initTours() {
    let userId = localStorage.getItem('UserId');
    this.tourService.getUserTours(userId).subscribe(
      (data: TourModel[]) => {
        this.tours = data;
      },
      (error: HttpErrorResponse) => {
        this.toastr.error(error.message);
      }
    )
  }

  OnSubmitUpdateForm(form: NgForm) {
    this.userService.updateUser(form.value)
      .subscribe((data: any) => {
        if (data.Succeeded) {
          this.modalRef.hide();
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
            this.toastr.error("Cannot update an user!");
          }
        });

  }

  checkDate(date: Date){
    if(date.valueOf() > Date.now()){
      return false;
    }
    if(date.valueOf() < Date.now()){
      return true;
    }
  }

  decline(): void {
    this.modalRef.hide();
  }

  backTicket(){

  }

  deleteAccount(){
    this.userService.deleteUser().subscribe(
      (data: any) => {
        this.modalRef.hide;
        localStorage.removeItem("userToken");
        localStorage.removeItem("UserId");
        localStorage.removeItem("constant_userId");
        localStorage.removeItem('userRoles');
        this.router.navigate([""]);
      },
      (error: HttpErrorResponse) => {
        this.toastr.error(error.message);
      }
    )
  }


}
