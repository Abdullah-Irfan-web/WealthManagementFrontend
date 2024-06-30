import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { DashboardService } from '../dashboard.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any;
  totalAsset = 0;
  totalLiability = 0;
  totalWealth=0;
  todayDate = new Date().toISOString().split('T')[0];
  todayDay = new Date().toLocaleDateString('en-US', { weekday: 'short' });

 
  public pieChartLabels: string[]  = ['Total Assets', 'Total Liabilities','Amount in Bank', 'Net Worth']


  public pieChartData: ChartData<'pie'> = {
    labels: this.pieChartLabels,
    datasets: [
      {
        label: "Overview",
        data: [],
        backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)', 'rgb(75, 192, 192)','rgb(40, 100, 212)'],
        hoverBackgroundColor: ['rgba(54, 162, 235, 0.8)', 'rgba(255, 99, 132, 0.8)', 'rgba(75, 192, 192, 0.8)','rgba(40, 100, 212, 0.8)'],
   }
    ]
  };


  public pieChartType: ChartType = 'pie';

  constructor(private dashboardService: DashboardService) {
    this.user = JSON.parse(localStorage.getItem('wealthuser') || '{}');
  }

  ngOnInit(): void {
    
    this.fetchFinancialData();
  }

  async fetchFinancialData() {
    try {
      const assets = await this.dashboardService.getAssets(this.user.email).toPromise();
      const liabilities = await this.dashboardService.getLiabilities(this.user.email).toPromise();
     const Wealth=await this.dashboardService.getTotalAmount(this.user.email).toPromise()
      this.totalAsset = assets.reduce((sum: number, asset: any) => sum + asset.value, 0);
      this.totalLiability = liabilities.reduce((sum: number, liability: any) => sum + liability.value, 0);
      this.totalWealth=Wealth.totalWealth;
      this.updateChartData();
       } catch (error) {
      console.error('Error fetching financial data:', error);
    }
  }
  updateChartData() {
    this.pieChartData = {
      ...this.pieChartData,
      datasets: [
        {
          ...this.pieChartData.datasets[0],
          data: [
            this.totalAsset ,
            this.totalLiability ,
            this.totalWealth,
            (this.totalWealth+this.totalAsset - this.totalLiability) 
          ]
        }
      ]
    };
  }
}
