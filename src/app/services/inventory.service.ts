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
        const newCategory = new Category(Date.now(), name);
        this.categories.push(newCategory);
        this.saveCategories();
    }
    editCategory(id: number, newName: string) {
      if (!newName.trim()) return; 
    
      const categories = this.getCategories(); 
      const categoryIndex = categories.findIndex(cat => cat.id === id);
    
      if (categoryIndex !== -1) {
        categories[categoryIndex].name = newName.trim(); 
        localStorage.setItem('categories', JSON.stringify(categories)); 
        this.categories = categories; 
      }
    }
    
    
  
    deleteCategory(id: number) {
      this.categories = this.categories.filter(cat => cat.id !== id);
      this.saveCategories();
    }

    
    public saveCategories() {
        localStorage.setItem('categories', JSON.stringify(this.categories));
      }
      public loadCategories() {
        const data = localStorage.getItem('categories');
        if (data) {
          this.categories = JSON.parse(data).map((cat: any) => {
            const category = new Category(cat.id, cat.name);
            category.products = cat.products.map((p: any) => new Product(p.id, p.name, p.quantity, p.price, p.supplier, p.minimum));
            return category;
          });
        }
      }
      getCategories(): Category[] {
        return this.categories;
      }
    }