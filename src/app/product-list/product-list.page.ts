import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StockService } from '../services/stock.service';
import { Product } from '../models/product.model';
import { InventoryService } from '../services/inventory.service';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule]
})
export class ProductListPage implements OnInit {
  categories: Category[] = [];
  constructor(private stockService: StockService, private inventoryService: InventoryService) { }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categories = this.inventoryService.getCategories();
  }

  getProductsByCategory(categoryId: number): Product[] {
    return this.stockService.getProductsByCategory(categoryId);
  }

  editProduct(product: Product, categoryId: number) {
    const newName = prompt("Novo nome do produto:", product.name);
    if (newName && newName.trim()) {
      product.name = newName.trim();
      this.inventoryService.updateProduct(categoryId, product);
    }
  }
}
