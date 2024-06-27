import { Component, OnInit } from '@angular/core';
import { LiabilityService } from '../liability.service';

@Component({
  selector: 'app-liability',
  templateUrl: './liability.component.html',
  styleUrls: ['./liability.component.css']
})
export class LiabilityComponent implements OnInit {
  liabilities: any[] = [];
  newLiability: any = { email: '', name: 'Mortgage', value: '' };
  
  colorclass: string[] = ['bg-red-100', 'bg-lime-100', 'bg-blue-100', 'bg-yellow-100', 'bg-orange-100'];
  useremail: string = JSON.parse(localStorage.getItem('wealthuser')!).email;

  constructor(private liabilityService: LiabilityService) {
    this.newLiability.email = this.useremail;
  }

  ngOnInit(): void {
    this.fetchLiabilities();
  }

  fetchLiabilities(): void {
    this.liabilityService.getLiabilities(this.useremail).subscribe(res => {
      this.liabilities = res;
    });
  }

  addOrUpdateLiability(): void {
    if (this.newLiability.id) {
      this.liabilityService.updateLiability(this.newLiability).subscribe(res => {
        if (res.message === 'ok') {
          this.fetchLiabilities();
        }
      });
    } else {
      this.liabilityService.addLiability(this.newLiability).subscribe(res => {
        if (res.message === 'ok') {
          this.fetchLiabilities();
        }
      });
    }
    this.newLiability = { id: null, name: 'Mortgage', value: '', email: this.useremail };
  }

  editLiability(liability: any): void {
    this.newLiability = liability;
  }

  deleteLiability(liability: any): void {
    this.liabilityService.deleteLiability(liability.id).subscribe(res => {
      if (res.message === 'ok') {
        this.fetchLiabilities();
      }
    });
  }
}
