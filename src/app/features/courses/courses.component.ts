import { Component, inject, signal } from '@angular/core';
import { CourseService } from '../../core/services/course.service';
import { Course } from '../../core/models/course.model';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginatorIntl } from '../../core/i18n/custom-paginator-intl';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }],
})
export class CoursesComponent {
  private courseService = inject(CourseService);

  courses = signal<Course[]>([]);
  isLoading = signal(false);

  // ESTADOS DE PAGINAÇÃO
  totalItems = signal(0);
  itemsPerPage = signal(5);
  currentPage = signal(1);

  displayedColumns: string[] = ['name', 'activeClassesCount', 'actions'];

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.isLoading.set(true);

    this.courseService
      .getAll(this.currentPage(), this.itemsPerPage())
      .subscribe({
        next: (response) => {
          this.courses.set(response.data);

          this.totalItems.set(response.meta.totalItems);
          this.currentPage.set(response.meta.currentPage);
          this.itemsPerPage.set(response.meta.itemsPerPage);

          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Erro ao carregar cursos:', err);
          this.isLoading.set(false);
        },
      });
  }

  onPageChange(event: PageEvent) {
    // CONVERSÃO DE ENTRADA (Material -> Nosso Estado)
    // O Material devolve pageIndex 0. Nós somamos 1 para virar currentPage 1.
    this.currentPage.set(event.pageIndex + 1);
    this.itemsPerPage.set(event.pageSize);

    this.loadCourses();
  }

  // Métodos para ações futuras (CRUD)
  onAdd() {
    console.log('Navegar para tela de criar curso');
  }

  onEdit(course: Course) {
    console.log('Editar curso:', course.name);
  }

  onDelete(course: Course) {
    if (confirm(`Tem certeza que deseja excluir o curso ${course.name}?`)) {
      console.log('Excluir curso:', course.id);
    }
  }
}
