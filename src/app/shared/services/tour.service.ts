import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TourModel } from '../models/tour.model';

@Injectable({
    providedIn: 'root'
})
export class TourService {
    readonly rootUrl = 'http://localhost:50990/'
    constructor(private http: HttpClient) { }

    getUserTours(userId: string) {
        return this.http.get(this.rootUrl + "api/tour/visitedtours/" + userId);
    }

    getAllTours() {
        return this.http.get(this.rootUrl + "api/tour");
    }

    getTour(tourId:string) {
        return this.http.get(this.rootUrl + "api/tour/" + tourId);
    }

    addTour(tour: TourModel) {
        const body: TourModel = {
            id: tour.id,
            name: tour.name,
            city: tour.city,
            location: tour.location,
            price: tour.price,
            placesCount: tour.placesCount,
            description: tour.description,
            date: tour.date,
            imageUrl: tour.imageUrl
        }
        return this.http.put(this.rootUrl + '/api/tour', body);

    }


}
