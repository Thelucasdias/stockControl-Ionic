import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { InventoryService } from './inventory.service'

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private categories: any[] = [];
  constructor(private inventoryService: InventoryService) {
    this.loadCategoriesFromInventory();
  }

  private loadCategoriesFromInventory() {
    this.inventoryService.loadCategories();
    this.categories = this.inventoryService.getCategories();
  }


  getProductsByCategory(categoryId: number): Product[] {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.products : [];
  }

  updateProductQuantity(categoryId: number, productId: string, product: Product) {
    const category = this.categories.find(cat => cat.id === categoryId);
    if (category) {
      const existingProduct = category.products.find((p: Product) => p.id === product.id);
      if (existingProduct) {
        existingProduct.name = product.name;
        existingProduct.price = product.price;
        existingProduct.supplier = product.supplier;
        existingProduct.minimum = product.minimum;
        existingProduct.date = product.date;

        this.inventoryService.saveCategories();
      }
    }
  }
  addProduct(categoryId: number, product: Product) {
    const category = this.categories.find(cat => cat.id === categoryId);
    if (category) {
      category.addProduct(product);
      this.inventoryService.saveCategories();
    }
  }
  deleteProduct(categoryId: number, productId: string) {
    const category = this.categories.find(cat => cat.id === categoryId);
    if (category) {
      category.products = category.products.filter((p: Product) => p.id !== productId);
      this.inventoryService.saveCategories();
    }
  }


}
