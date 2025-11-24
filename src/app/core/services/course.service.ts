import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PaginatedResponse } from '../models/api-paginated-response.model';
import {
  Course,
  CreateCourseRequest,
  UpdateCourseRequest,
} from '../models/course.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/courses`;

  getAll(
    page: number = 1,
    take: number = 10
  ): Observable<PaginatedResponse<Course>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('take', take.toString());

    return this.http.get<PaginatedResponse<Course>>(this.API_URL, { params });
  }

  getById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.API_URL}/${id}`);
  }

  create(payload: CreateCourseRequest): Observable<Course> {
    return this.http.post<Course>(this.API_URL, payload);
  }

  update(id: number, payload: UpdateCourseRequest): Observable<Course> {
    return this.http.patch<Course>(`${this.API_URL}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
