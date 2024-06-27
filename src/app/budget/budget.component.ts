// budget.component.ts
import { Component, OnInit } from '@angular/core';
import emailjs from '@emailjs/browser';
import { Chart, ChartData, registerables } from 'chart.js';
import { BudgetService } from '../budget.service';

Chart.register(...registerables);

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {
  monthlyBudget: number = 0;
  categories: any[] = [];
  editingCategory: any = null;
  newCategory: any = {
    id: null,
    name: 'Beauty',
    amount: '',
    email: ''
  };
  dailySpendable:number=0;
  useremail: string = JSON.parse(localStorage.getItem('wealthuser')!).email;
  

  constructor(private budgetService: BudgetService) { 
    this.newCategory.email = this.useremail;
  }

  ngOnInit(): void {
   
   
    this.fetchBudget();
  }

  fetchBudget(): void {
    this.budgetService.getBudget(this.useremail).subscribe(res => {
      this.categories = res;
      this.monthlyBudget = res.reduce((sum: number, category: any) => sum + category.amount, 0);
      
      this.calculateDailySpendable(this.monthlyBudget);
      if (this.monthlyBudget < 200) {
        this.sendMail(this.monthlyBudget);
      }
    });
  }

  calculateDailySpendable(totalBudget: number): void {
    let date = new Date();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let dayLeft = new Date(year, month, 0).getDate() - parseInt(date.toISOString().split('T')[0].split("-")[2]);
   this.dailySpendable=Number((totalBudget / dayLeft).toFixed(2));
  }

  addCategoryBudget(): void {
    this.budgetService.addBudget(this.newCategory).subscribe(res => {
      if (res.message === 'ok') {
        this.fetchBudget();
        this.resetNewCategory();
      }
    });
  }

  startEditing(category: any): void {
    this.editingCategory = { ...category };
  }

  saveEdit(): void {
    this.budgetService.updateBudget(this.editingCategory).subscribe(res => {
      if (res.message === 'ok') {
        this.fetchBudget();
        this.editingCategory = null;
      }
    });
  }

  async sendMail(balance: number) {
    emailjs.init('VddDsBK3HlyMHJWPC');
   let response =await emailjs.send("service_5umsww5","template_sc9cxzu",{
      totalBudget:balance ,
      reply_to: this.useremail,
      });
      console.log(response);
  }

  resetNewCategory(): void {
    this.newCategory = {
      id: null,
      name: 'Beauty',
      amount: '',
      email: this.useremail
    };
  }

  getPieData(): ChartData<'pie'> {
    return {
      labels: this.categories.map(category => category.name),
      datasets: [{
        data: this.categories.map(category => category.amount),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', 
          '#FF9F40', '#E7E9ED', '#C9CBCF', '#FF6384'
        ]
      }]
    };
  }
}
