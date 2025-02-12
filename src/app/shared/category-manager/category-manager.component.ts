import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InventoryService } from '../../services/inventory.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule]
})
export class CategoryManagerComponent implements OnInit {
  categories: Category[] = [];
  newCategory = new FormControl('');

  constructor(private inventoryService: InventoryService) { }

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
