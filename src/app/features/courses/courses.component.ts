import { Component, inject, OnInit, signal } from '@angular/core';
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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CourseFormComponent } from './components/course-form/course-form.component';

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
    MatDialogModule,
    MatSnackBarModule,
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }],
})
export class CoursesComponent implements OnInit {
  private courseService = inject(CourseService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

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
    this.currentPage.set(event.pageIndex + 1);
    this.itemsPerPage.set(event.pageSize);

    this.loadCourses();
  }

  // Métodos para ações futuras (CRUD)
  onAdd() {
    const dialogRef = this.dialog.open(CourseFormComponent, {
      width: '400px',
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.loadCourses();
      }
    });
  }

  onEdit(course: Course) {
    const dialogRef = this.dialog.open(CourseFormComponent, {
      width: '400px',
      data: course,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.loadCourses();
      }
    });
  }

  onDelete(course: Course) {
    if (confirm(`Tem certeza que deseja excluir o curso "${course.name}"?`)) {
      this.isLoading.set(true);

      this.courseService.delete(course.id).subscribe({
        next: () => {
          this.snackBar.open('Curso excluído!', 'Fechar', { duration: 3000 });
          this.loadCourses();
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('Erro ao excluir curso.', 'Fechar');
          this.isLoading.set(false);
        },
      });
    }
  }
}
