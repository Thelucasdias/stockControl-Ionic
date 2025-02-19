import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StockService } from '../services/stock.service';
import { Product } from '../models/product.model';
import { InventoryService } from '../services/inventory.service';
import { Category } from '../models/category.model';
import { ModalController, IonicModule } from '@ionic/angular';
import { EditProductModalComponent } from '../shared/edit-product-modal/edit-product-modal.component';
import { InputOutputComponent } from '../shared/input-output/input-output.component';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule]
})
export class ProductListPage implements OnInit {
  categories: Category[] = [];
  constructor(private stockService: StockService,
    private inventoryService: InventoryService,
    private modalCtrl: ModalController,
      ) { }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categories = this.inventoryService.getCategories();
  }

  getProductsByCategory(categoryId: number): Product[] {
    return this.stockService.getProductsByCategory(categoryId);
  }

  async openEditModal(product: Product, categoryId: number) {
    const modal = await this.modalCtrl.create({
      component: EditProductModalComponent,
      componentProps: { product: { ...product }, categoryId }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data && data.updatedProduct) {
      this.inventoryService.updateProduct(categoryId, data.updatedProduct);
      this.loadCategories();
    }
  }

  async openInputOutputModal(product: Product, categoryId: number) {
    const modal = await this.modalCtrl.create({
      component: InputOutputComponent,
      componentProps: { product: { ...product }, categoryId }
    });
  
    await modal.present();
  
    const { data } = await modal.onDidDismiss();
    if (data && data.updatedProduct) {
      this.inventoryService.updateProduct(categoryId, data.updatedProduct);
      this.loadCategories();
    }
  }
  



}
