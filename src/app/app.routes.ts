import { Routes } from '@angular/router';
import { DashboardComponent } from './componenets/dashboard/dashboard.component';
import { LoginComponent } from './componenets/login/login.component';
import { NotFoundComponent } from './componenets/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';
import { ProductsComponent } from './componenets/products/products.component';
import { AddProductComponent } from './componenets/add-product/add-product.component';
import { RegisterComponent } from './componenets/register/register.component';

export const routes: Routes = [
    {path: '', redirectTo: 'Home', pathMatch: 'full'},
    {path: 'Home', component: DashboardComponent, canActivate: [authGuard]},
    {path: 'Products', component: ProductsComponent, canActivate: [authGuard]},
    {path: 'AddProduct', component: AddProductComponent, canActivate: [authGuard]},
    {path: 'AddProduct/:id', component: AddProductComponent, canActivate: [authGuard]},
    // {path: 'AddProduct/:id?', loadComponent() {
    //     return import('./componenets/add-product/add-product.component').then(m => m.AddProductComponent);
    // }, canActivate: [authGuard]}, 
    {path: 'Login', component: LoginComponent},
    {path: 'Register', component: RegisterComponent},
    {path: '**', component: NotFoundComponent},
];
