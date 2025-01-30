import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})

export class InventoryService {
    private categories: Category[] = [];
    constructor() {
        this.loadCategories();
    }

    addCategory(name: string) {
        const newCategory = new Category(Date.now().toString(), name);
        this.categories.push(newCategory);
        this.saveCategories();
    }

    addProduct(categoryId: string, product: Product) {
        const category = this.categories.find(cat => cat.id === categoryId);
        if (category) {
            category.addProduct(product);
            this.saveCategories();
        }
    }
    private saveCategories() {
        localStorage.setItem('categories', JSON.stringify(this.categories));
      }
      private loadCategories() {
        const data = localStorage.getItem('categories');
        if (data) {
          this.categories = JSON.parse(data).map((cat: any) => {
            const category = new Category(cat.id, cat.name);
            category.products = cat.products.map((p: any) => new Product(p.id, p.name, p.quantity, p.price));
            return category;
          });
        }
      }
      getCategories(): Category[] {
        return this.categories;
      }
    }