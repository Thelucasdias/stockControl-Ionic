import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
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
  newCategory = new FormControl('');

  constructor(private inventoryService: InventoryService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categories = this.inventoryService.getCategories();
  }

  addCategory() {
    const categoryName = this.newCategory.value?.trim();
    if (categoryName) {
      this.inventoryService.addCategory(categoryName);
      this.newCategory.reset(); 
      this.loadCategories();
    }
  }
}
