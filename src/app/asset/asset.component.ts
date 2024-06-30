import { Component, OnInit } from '@angular/core';
import { AssetService } from '../asset.service';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent implements OnInit {
  assets: any[] = [];
  newAsset: any = { email: '', name: 'Real Estate', value: '' };

  colorclass: string[] = ['bg-red-100', 'bg-lime-100', 'bg-blue-100', 'bg-yellow-100', 'bg-orange-100'];
  useremail: string = JSON.parse(localStorage.getItem('wealthuser')!).email;

  constructor(private assetService: AssetService) {
    this.newAsset.email = this.useremail;
  }

  ngOnInit(): void {
    this.fetchAssets();
  }

  fetchAssets(): void {
    this.assetService.getAssets(this.useremail).subscribe(res => {
      this.assets = res;
    });
  }

  addOrUpdateAsset(): void {
    if (this.newAsset.id) {
      this.assetService.updateAsset(this.newAsset).subscribe(res => {
        if (res.message !== 'ok') {
          this.fetchAssets();
          alert(res.message);
         
        }
        else{
          this.fetchAssets();
        }
      });
    } else {
      this.assetService.addAsset(this.newAsset).subscribe(res => {
        if(res.message!=='ok'){
          alert(res.message);
        }
       
        else {
          this.fetchAssets();
        }
      });
    }
    this.newAsset = { id: null, name: 'Real Estate', value: '', email: this.useremail };
  }

  editAsset(asset: any): void {
    this.newAsset = asset;
  }

  deleteAsset(asset: any): void {
    this.assetService.deleteAsset(asset.id).subscribe(res => {
      if (res.message === 'ok') {
        this.fetchAssets();
      }
    });
  }
}
