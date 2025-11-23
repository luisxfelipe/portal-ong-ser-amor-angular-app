import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PaginatedResponse } from '../models/api-paginated-response.model';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/courses`;

  getAll(page: number = 1, take: number = 10) {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('take', take.toString());

    return this.http.get<PaginatedResponse<Course>>(this.API_URL, { params });
  }
}
