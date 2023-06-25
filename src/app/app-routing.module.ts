import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { PhotoFormComponent } from './photo-form/photo-form.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PhotoListResolver } from './resolvers/photo-list.resolver';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    canActivate: [AuthGuard],
    children:[
      {
        path: '',
        loadComponent: () => import('./sign-in/sign-in.component').then(m => m.SignInComponent),
      },
      {
        path: 'signup',
        loadComponent: () => import('./sign-up/sign-up.component').then(m => m.SignUpComponent),
      }
    ]
  },
  {
  path: 'user/:userName',
  component: PhotoListComponent,
  // The component will be rendered only after the data is resolved
  resolve: {
    photos: PhotoListResolver
  }
  },
  {
    path: 'p/add',
    component: PhotoFormComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
