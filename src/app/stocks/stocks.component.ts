import { Component, OnInit } from '@angular/core';
import { StocksService } from '../stocks.service';



@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  symbol: string = '';
  stockData: any = null;
  qty: number = 0;
  portfolio: any[] = [];

  PL: number[] = [];
  useremail: string = JSON.parse(localStorage.getItem('wealthuser')!).email;


  constructor(private stockService: StocksService) { }

  ngOnInit(): void {
   
    this.fetchPortfolio();
  }

  fetchPortfolio(): void {
    this.stockService.getPortfolio(this.useremail).subscribe(res => {
      this.portfolio = res;
    });
  }
  handleqtychange(event:Event): void{
    const input=event.target as HTMLInputElement;
    this.qty=Number(input.value);
  }
  handleInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.symbol = input.value;
  }

  fetchStockData(): void {
    this.stockService.getStockData(this.symbol).subscribe(res => {
      this.stockData = res.data;
    }, error => {
      console.error('Error fetching stock data:', error);
    });
  }

  fetchPL(symbol: string, buyprice: number,index:number): void {
    this.stockService.getStockData(symbol).subscribe(res => {
    //   var newPL = [
    //     ...this.PL.slice(0, index),
    //     ,res.data.regularMarketPrice - buyprice,
    //     ...this.PL.slice(index)
    // ];
    this.PL.splice(index,0,res.data.regularMarketPrice - buyprice)
    console.log(this.PL);
    }, error => {
      console.error('Error fetching stock data:', error);
    });
  }

  sellStock(id: number,index:number): void {
      const data={
        id:id,
        pl:this.PL[index],
        email:this.useremail
      }
    this.stockService.sellStock(data).subscribe(res => {
      // var filteredArray = this.PL.filter(e => e !== res.data.regularMarketPrice - buyprice)
      // this.PL=[...filteredArray]
      delete this.PL[index];
      if (res.message === 'ok') {
       
        this.fetchPortfolio();
      }
    });
  }

  addToPortfolio(): void {
    if (this.stockData) {
      const entry = {
        symbol: this.stockData.symbol,
        price: this.stockData.regularMarketPrice,
        quantity: this.qty,
        email: this.useremail
      };
      this.stockService.addStockToPortfolio(entry).subscribe(res => {
        if (res.message !== 'ok') {
              alert(res.message);
            }

        else{
          this.fetchPortfolio();
          this.stockData = null;
          this.symbol = '';
          this.qty = 0;
        }
       
      });
    }
  }
}
