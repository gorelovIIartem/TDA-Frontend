import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegistrationUser } from '../models/registration.model';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from '../models/loginModel.midel'
import { UpdateUser } from '../models/update-user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    readonly rootUrl = 'http://localhost:50990/'
    constructor(private http: HttpClient, private toastr: ToastrService) { }
    deleteUser() {
        return this.http.delete(this.rootUrl + '/api/Account/delete/' + localStorage.getItem('UserId'));
    }
    registerUser(user: RegistrationUser) {
        const body: RegistrationUser = {
            UserName: user.UserName,
            FullName: user.FullName,
            Password: user.Password,
            ConfirmPassword: user.ConfirmPassword,
            Email: user.Email
        }
        var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
        return this.http.post(this.rootUrl + '/api/Account/register', body, { headers: reqHeader });
    }

    userAuthentification(Username, Password) {
        let data = new LoginModel();
        data.password = Password;
        data.username = Username;
        var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
        return this.http.post(this.rootUrl + "api/authorization/token", data, { headers: reqHeader });
    }

    getUserById(id: string) {
        return this.http.get(this.rootUrl + "api/Account/" + id);
    }

    updateUser(user: UpdateUser) {
        const body: UpdateUser = {
            Age: user.Age,
            Phone: user.Phone,
            Birthday: user.Birthday,
            Address: user.Address,
            FullName: user.FullName,
            UserId: localStorage.getItem('userId'),
            Email: user.Email,
            ImageUrl:user.ImageUrl
        }
        return this.http.put(this.rootUrl + "api/Account/" + localStorage.getItem('UserId'), body);
    }
    uploadPhoto(fileToUpload:File){
        const endpoint = this.rootUrl + '/api/Account' + localStorage.getItem('userId') + '/imageAccount';
        const formData:FormData = new FormData();
        formData.append('Image', fileToUpload, fileToUpload.name);
        return this.http.post(endpoint, formData);
    }
    
    
}
