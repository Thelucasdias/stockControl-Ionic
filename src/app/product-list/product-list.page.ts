import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { InventoryService } from '../services/inventory.service';
import { Category } from '../models/category.model';
import { StockService } from '../services/stock.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule]
})
export class ProductListPage implements OnInit {
  categories: Category[] = [];
  
  newCategory = new FormControl('');
  editCategoryName = new FormControl('');

  constructor(private inventoryService: InventoryService, private stockService: StockService) { }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categories = this.inventoryService.getCategories();
  }
  
  getProductsByCategory(categoryId: number): Product[] {
    return this.stockService.getProductsByCategory(categoryId);
  }

  addCategory() {
    const categoryName = this.newCategory.value?.trim();
    if (categoryName) {
      this.inventoryService.addCategory(categoryName);
      this.newCategory.reset();
      this.loadCategories();
    }
  }

  editCategory(id: number) {
    const newName = prompt("Digite o novo nome da categoria:");

    if (newName && newName.trim()) {
      this.inventoryService.editCategory(id, newName.trim());
      this.loadCategories();
    }

  }
  
  deleteCategory(id: number) {
    this.inventoryService.deleteCategory(id);
    this.loadCategories();
  }
}
