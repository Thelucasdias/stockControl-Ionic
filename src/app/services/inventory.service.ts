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

    updateProduct(categoryId: number, updatedProduct: Product): void {
      const categoryIndex = this.categories.findIndex(cat => cat.id === categoryId);
  
      if (categoryIndex !== -1) {
          const productIndex = this.categories[categoryIndex].products.findIndex(p => p.id === updatedProduct.id);
  
          if (productIndex !== -1) {
             
              this.categories[categoryIndex].products[productIndex] = updatedProduct;
              this.saveCategories(); 
              console.log("Produto atualizado com sucesso!");
          } else {
              console.warn("Produto não encontrado na categoria!");
          }
      } else {
          console.warn("Categoria não encontrada!");
      }
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