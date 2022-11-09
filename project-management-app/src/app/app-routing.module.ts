import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { WelcomePageComponent } from './core/pages/welcome-page/welcome-page.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./boards/boards.module').then(m => m.BoardsModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'welcome',
    component: WelcomePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
