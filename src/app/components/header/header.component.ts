import { Component, TemplateRef, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { RegistrationUser } from 'src/app/shared/models/registration.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  ngOnInit() {
  }

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService,
    private router: Router, private userService: UserService,
    private toastr: ToastrService) { }

  user: RegistrationUser = new RegistrationUser();

  isLoginError: boolean = false;

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  isLogined() {
    let isShow: Boolean;
    if (localStorage.getItem('UserId') !== null) {
      isShow = true;
    }
    else {
      isShow = false;
    }
    return isShow;
  }

  logOut() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("UserId");
    localStorage.removeItem("constant_userId");
    localStorage.removeItem('userRoles');
    this.router.navigate([""]);
  }

  OnLoginFormSubmit(Login: string, Password: string) {
    this.userService.userAuthentification(Login, Password).subscribe(
      (data: any) => {
        localStorage.setItem("userToken", data.result);
        localStorage.setItem("UserId", data.userId);
        localStorage.setItem("constant_userId", data.userId);
        localStorage.setItem('userRoles', data.roles);

        this.router.navigate(["/profile/" + data.userId]);
        this.modalRef.hide();
      },
      (error: HttpErrorResponse) => {
        this.isLoginError = true;
        this.toastr.error(error.message);
      }
    )
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = {
      UserName: '',
      FullName: '',
      Password: '',
      ConfirmPassword: '',
      Email: ''
    }
  }

  OnSingUpFormSubmit(form: NgForm) {
    this.userService.registerUser(form.value)
      .subscribe((data: any) => {
        if (data.Succeeded) {
          this.resetForm(form);
          this.toastr.success(data.Message);
          this.modalRef.hide();
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
            this.toastr.error("Cannot register an user!");
          }
        });
  }

  goToProfile(){
    let userId = localStorage.getItem('UserId');
    this.router.navigate(["/profile/" + userId]);
  }

}
