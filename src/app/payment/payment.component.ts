import { Component, OnInit } from '@angular/core';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentData: any = {
    name: '',
    emailto: '',
    amount: '',
    date:'',
    day:'',
    time:'',
  };
  payments: any[] = [];

  useremail: string = JSON.parse(localStorage.getItem('wealthuser')!).email;

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.fetchPayments();
  }

  fetchPayments(): void {
    this.paymentService.getPayments(this.useremail).subscribe(res => {
      this.payments = res;
    });
  }

  makePayment(): void {
   
    const date = new Date();
    const month = date.getMonth() + 1;
    const currdate = `${date.getFullYear()}-${month > 9 ? month : '0' + month}-${date.getDate()}`;
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });
    const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const newPayment = {
      ...this.paymentData,
      emailfrom: this.useremail,
      
      
      date: currdate,
      day,
      time,
    };
    console.log(newPayment)
    this.paymentService.makePayment(newPayment).subscribe(res => {
      if (res.message === 'ok') {
        this.fetchPayments();
      } else {
        alert(res.message);
      }
    });

    this.paymentData = {
      name: '',
      emailto: '',
      amount: ''
    };
  }

  exportToCSV(): void {
    const options = {
      headers: ['Date', 'Amount', 'From', 'To','Type']
    };
       const data = this.payments.map(payment => [
        payment.date,
        payment.amount,
        payment.emailfrom,
        payment.emailto,
     
      payment.emailfrom === this.useremail ? 'Debit' : 'Credit'
    ]);

    new ngxCsv(data, 'MyPayReport',options);
  }
}
