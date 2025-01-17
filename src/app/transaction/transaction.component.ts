import { Component, OnInit } from '@angular/core';
import { isThisMonth, isThisWeek, isToday } from 'date-fns';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { TransactionService } from '../transaction.service';
 
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transactions: any[] = [];
  newTransaction: any = {
    date: '',
    day: '',
    time: '',
    type: 'Food',
    description: '',
    amount: '',
    balance: 'credit',
    paymentMethod: '',
    email: ''
  };
  filter: string = 'all';
  
  useremail: string = JSON.parse(localStorage.getItem('wealthuser')!).email;

  constructor(private transactionService: TransactionService) {
    this.newTransaction.email = this.useremail;
  }

  ngOnInit(): void {
    this.fetchTransactions();
  }

  fetchTransactions(): void {
    this.transactionService.getTransactions(this.useremail).subscribe(res => {
      this.transactions = res;
    });
  }

  handleInputChange(event: any): void {
    const { name, value } = event.target;
    this.newTransaction = {
      ...this.newTransaction,
      [name]: value
    };
  }

  addTransaction(): void {
    const date = new Date();
    const month = date.getMonth() + 1;
    const currdate = `${date.getFullYear()}-${month > 9 ? month : '0' + month}-${date.getDate()}`;
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });
    const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const newEntry = {
      ...this.newTransaction,
      date: currdate,
      day,
      time,
      amount: parseFloat(this.newTransaction.amount)
    };

    this.transactionService.addTransaction(newEntry).subscribe(res => {
      if (res.message !== 'ok') {
       alert(res.message);
      }
   else {
        this.fetchTransactions();
      }
    });

    this.newTransaction = {
      date: '',
      day: '',
      time:'',
      type: 'Food',
      description: '',
      amount: '',
      balance: 'credit',
      paymentMethod: '',
      email: this.useremail
    };
  }

  filterTransactions(): any[] {
    if (this.filter === 'today') {
      return this.transactions.filter(transaction => isToday(new Date(transaction.date)));
    }
    if (this.filter === 'thisWeek') {
      return this.transactions.filter(transaction => isThisWeek(new Date(transaction.date), { weekStartsOn: 1 }));
    }
    if (this.filter === 'thisMonth') {
      return this.transactions.filter(transaction => isThisMonth(new Date(transaction.date)));
    }
    return this.transactions;
  }

  setFilter(filter: string): void {
    this.filter = filter;
  }

  get filteredTransactions(): any[] {
    return this.filterTransactions();
  }
  exportToCSV(): void {
    const options = {
      headers: ["Date", "Day", "Time", "Type", "Description", "Amount", "Balance", "Payment Method", "Email"]
    };

    const data = this.transactions.map(transaction => ({
      Date: transaction.date,
      Day: transaction.day,
      Time: transaction.time,
      Type: transaction.type,
      Description: transaction.description,
      Amount: transaction.amount,
      Balance: transaction.balance,
      PaymentMethod: transaction.paymentMethod,
      Email: transaction.email
    }));

    new ngxCsv(data, 'My Report',options);
  }
}

