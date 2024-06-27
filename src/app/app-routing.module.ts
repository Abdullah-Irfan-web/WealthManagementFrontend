import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AssetComponent } from './asset/asset.component';
import { AuthGuard } from './auth.guard';
import { BudgetComponent } from './budget/budget.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LiabilityComponent } from './liability/liability.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SignupComponent } from './signup/signup.component';
import { StocksComponent } from './stocks/stocks.component';
import { TransactionComponent } from './transaction/transaction.component';
const routes: Routes = [
 
  { path: '', component: SignupComponent },
  {path:'login',component:LoginComponent},
  { path: 'home', component: DashboardComponent,canActivate: [AuthGuard] },
  { path: 'assets', component: AssetComponent,canActivate: [AuthGuard] },
  { path: 'liabilities', component: LiabilityComponent,canActivate: [AuthGuard] },
  { path: 'transactions', component: TransactionComponent,canActivate: [AuthGuard] },
  { path: 'budget', component: BudgetComponent,canActivate: [AuthGuard] },
  { path: 'stocks', component: StocksComponent,canActivate: [AuthGuard] },
  {path:'logout',component:LogoutComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
