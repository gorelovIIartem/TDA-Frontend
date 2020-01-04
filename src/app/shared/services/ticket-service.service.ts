import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddTicketModel } from '../models/add-ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  readonly rootUrl = 'http://localhost:50990/';

  constructor(private http: HttpClient) { }

  addTicket(ticket: AddTicketModel){
    return this.http.post(this.rootUrl + '/api/ticket', ticket);
  }

}
