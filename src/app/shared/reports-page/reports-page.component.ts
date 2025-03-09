import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class ReportsPageComponent implements OnInit {
  products: any[] = [];
  totalStockValue = 0;
  totalStockIn = 0;
  totalStockOut = 0;
  balance = 0;

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    this.products = categories.flatMap(
      (category: any) => category.products || [],
    );
    this.calculateTotalStockValue();
    this.calculateTotalStockIn();
    this.calculateTotalStockOut();
    this.calculateBalance();
  }

  calculateTotalStockValue() {
    this.totalStockValue = this.products.reduce((acc, product) => {
      return acc + product.quantity * product.price;
    }, 0);
  }
  calculateTotalStockIn() {
    this.totalStockIn = this.products.reduce((acc, product) => {
      const stockInTotal = product.stockIn.reduce((sum: number, entry: any) => {
        return sum + entry.quantity;
      }, 0);
      return acc + stockInTotal;
    }, 0);
  }

  calculateTotalStockOut() {
    this.totalStockOut = this.products.reduce((acc, product) => {
      const stockOutTotal = product.stockOut.reduce(
        (sum: number, entry: any) => {
          return sum + entry.quantity;
        },
        0,
      );
      return acc + stockOutTotal;
    }, 0);
  }

  calculateBalance() {
    this.balance = this.totalStockOut - this.totalStockIn;
  }
}
