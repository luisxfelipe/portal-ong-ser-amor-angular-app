import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { authGuard } from './core/guards/auth.guard';
import { CoursesRoutes } from './features/courses/courses.routing';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [{ path: 'cursos', children: CoursesRoutes }],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
