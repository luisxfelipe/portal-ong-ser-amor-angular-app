export interface Course {
  id: number;
  name: string;
  activeClassesCount?: number;
}

export interface CreateCourseRequest {
  name: string;
}

export interface UpdateCourseRequest {
  name: string;
}
