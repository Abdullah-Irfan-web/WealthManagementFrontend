import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AssetService } from './asset.service';
import { AssetComponent } from './asset/asset.component';
import { AuthService } from './auth.service';
import { BudgetService } from './budget.service';
import { BudgetComponent } from './budget/budget.component';
import { DashboardService } from './dashboard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LiabilityService } from './liability.service';
import { LiabilityComponent } from './liability/liability.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { StocksService } from './stocks.service';
import { StocksComponent } from './stocks/stocks.component';
import { TransactionService } from './transaction.service';
import { TransactionComponent } from './transaction/transaction.component';
import { LogoutComponent } from './logout/logout.component';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignupComponent,
    LoginComponent,
    AssetComponent,
    LiabilityComponent,
    TransactionComponent,
    BudgetComponent,
    StocksComponent,
    LogoutComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BaseChartDirective
   
  ],
  providers: [
    provideClientHydration(),
    provideCharts(withDefaultRegisterables()),
    AuthService,
    DashboardService,
    AssetService,
    LiabilityService,
    TransactionService,
    BudgetService,
    StocksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


