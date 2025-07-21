import { Routes } from '@angular/router';
import { DashboardComponent } from './componenets/dashboard/dashboard.component';
import { LoginComponent } from './componenets/user/login/login.component';
import { NotFoundComponent } from './componenets/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';
import { CustomerBalanceComponent } from './componenets/customers/customer-balance/customer-balance.component';
import { CustomersPageComponent } from './componenets/customers/customers-page/customers-page.component';
import { AddCustomerComponent } from './componenets/customers/add-customer/add-customer.component';
import { CategoriesPageComponent } from './componenets/category/categories-page/categories-page.component';
import { AddCategoryComponent } from './componenets/category/add-category/add-category.component';
import { ProductsComponent } from './componenets/product/products/products.component';
import { AddProductComponent } from './componenets/product/add-product/add-product.component';
import { RegisterComponent } from './componenets/user/register/register.component';
import { AddMoneysafeComponent } from './componenets/moneysafes/add-moneysafe/add-moneysafe.component';
import { MoneysafeMovesComponent } from './componenets/moneysafes/moneysafe-moves/moneysafe-moves.component';
import { MoneysafesPageComponent } from './componenets/moneysafes/moneysafes-page/moneysafes-page.component';
import { ExpenseTypesPageComponent } from './componenets/expenseType/expenseTypes-page/expense-types-page/expense-types-page.component';
import { AddExpenseTypesComponent } from './componenets/expenseType/add-expenseType/add-expense-types/add-expense-types.component';
import { ExpensesPageComponent } from './componenets/expense/expenses-page/expenses-page.component';
import { AddExpensesComponent } from './componenets/expense/add-expense/add-expenses.component';
import { LoansPageComponent } from './componenets/loan/loans-page/loans-page.component';
import { AddLoansComponent } from './componenets/loan/add-loan/add-loans.component';
import { EditUserDataComponent } from './componenets/user/edit-user-data/edit-user-data.component';
import { OrdersPageComponent } from './componenets/order/orders-page/orders-page.component';
import { AddOrderComponent } from './componenets/order/add-order/add-order.component';
import { OrderDetailsComponent } from './componenets/order/order-details/order-details.component';
import { OrderCommsComponent } from './componenets/order/order-comms/order-comms.component';
import { UserBalanceComponent } from './componenets/user/user-balance/user-balance.component';
import { EmpsComponent } from './componenets/emps/emps/emps.component';
import { AddEmpComponent } from './componenets/emps/add-emp/add-emp.component';
import { EditEmpPassAdminComponent } from './componenets/emps/edit-emp-pass-admin/edit-emp-pass-admin.component';
import { CompleteOrderComponent } from './componenets/order/complete-order/complete-order.component';
import { ChatPageComponent } from './componenets/chat/chat-page/chat-page.component';


export const routes: Routes = [
    {path: '', redirectTo: 'Home', pathMatch: 'full'},
    {path: 'Home', component: DashboardComponent, canActivate: [authGuard]},

    {path: 'Orders', component: OrdersPageComponent, canActivate: [authGuard]},
    {path: 'AddOrder', component: AddOrderComponent, canActivate: [authGuard]},
    {path: 'OrderComms', component: OrderCommsComponent, canActivate: [authGuard]},
    {path: 'CompleteOrder/:id', component: CompleteOrderComponent, canActivate: [authGuard]},
    {path: 'AddOrder/:id', component: AddOrderComponent, canActivate: [authGuard]},
    {path: 'OrderDetails/:id', component: OrderDetailsComponent, canActivate: [authGuard]},

    {path: 'Customers', component: CustomersPageComponent, canActivate: [authGuard]},
    {path: 'AddCustomer', component: AddCustomerComponent, canActivate: [authGuard]},
    {path: 'AddCustomer/:id', component: AddCustomerComponent, canActivate: [authGuard]},
    {path: 'CustomerBalance/:id', component: CustomerBalanceComponent, canActivate: [authGuard]},

    {path: 'MoneySafes', component: MoneysafesPageComponent, canActivate: [authGuard]},
    {path: 'AddMoneysafe', component: AddMoneysafeComponent, canActivate: [authGuard]},
    {path: 'AddMoneysafe/:id', component: AddMoneysafeComponent, canActivate: [authGuard]},
    {path: 'MoneysafeMoves/:id', component: MoneysafeMovesComponent, canActivate: [authGuard]},
    
    {path: 'Categories', component: CategoriesPageComponent, canActivate: [authGuard]},
    {path: 'AddCategory', component: AddCategoryComponent, canActivate: [authGuard]},
    {path: 'AddCategory/:id', component: AddCategoryComponent, canActivate: [authGuard]},
    
    {path: 'ExpenseTypes', component: ExpenseTypesPageComponent, canActivate: [authGuard]},
    {path: 'AddExpenseType', component: AddExpenseTypesComponent, canActivate: [authGuard]},
    {path: 'AddExpenseType/:id', component: AddExpenseTypesComponent, canActivate: [authGuard]},
    
    {path: 'Expenses', component: ExpensesPageComponent, canActivate: [authGuard]},
    {path: 'AddExpense', component: AddExpensesComponent, canActivate: [authGuard]},
    {path: 'AddExpense/:id', component: AddExpensesComponent, canActivate: [authGuard]},
    
    {path: 'Loans', component: LoansPageComponent, canActivate: [authGuard]},
    {path: 'AddLoan', component: AddLoansComponent, canActivate: [authGuard]},
    {path: 'AddLoan/:id', component: AddLoansComponent, canActivate: [authGuard]},

    {path: 'EditUserData', component: EditUserDataComponent, canActivate: [authGuard]},
    {path: 'UserBalance/:id', component: UserBalanceComponent, canActivate: [authGuard]},
    
    {path: 'Products', component: ProductsComponent, canActivate: [authGuard]},
    {path: 'AddProduct', component: AddProductComponent, canActivate: [authGuard]},
    {path: 'AddProduct/:id', component: AddProductComponent, canActivate: [authGuard]},
    
    {path: 'Chat', component: ChatPageComponent, canActivate: [authGuard]},
    
    {path: 'Emps', component: EmpsComponent, canActivate: [authGuard]},
    {path: 'AddEditEmp/:id', component: AddEmpComponent, canActivate: [authGuard]},
    {path: 'EditEmpPasswordAdmin/:id', component: EditEmpPassAdminComponent, canActivate: [authGuard]},


        // {path: 'AddProduct/:id?', loadComponent() {
        //     return import('./componenets/add-product/add-product.component').then(m => m.AddProductComponent);
        // }, canActivate: [authGuard]}, 
        
    {path: 'Login', component: LoginComponent},
    {path: 'Register', component: RegisterComponent},
    {path: '**', component: NotFoundComponent},
];
