import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  
  {
    path: 'new-user',
    loadComponent: () => import('./new-user/new-user.page').then( m => m.NewUserPage)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./forgot-password/forgot-password.page').then( m => m.ForgotPasswordPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage)
  },
  {
    path: 'product-list',
    loadComponent: () => import('./product-list/product-list.page').then( m => m.ProductListPage)
  },
  {
    path: 'product-add',
    loadComponent: () => import('./product-add/product-add.page').then( m => m.ProductAddPage)
  },
  {
    path: 'categories',
    loadComponent: () => import('./categories/categories.page').then( m => m.CategoriesPage)
  },
  
    
  
];
