import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StockService } from '../../services/stock.service';
import { Product } from '../../models/product.model';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-stock-movement',
  templateUrl: './stock-movement.page.html',
  styleUrls: ['./stock-movement.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, FormsModule]
})
export class StockMovementPage implements OnInit {

  categories: any[] = [];
  products: Product[] = [];
  selectedCategoryId: number | null = null;
  stockForm: FormGroup;


  constructor(private stockService: StockService, private fb: FormBuilder, private inventoryService: InventoryService) {
    this.stockForm = this.fb.group({
      productId: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      type: ['entry', Validators.required]
    });
  }

  ngOnInit() {
    this.categories = this.inventoryService.getCategories();
  }
  onCategoryChange() {
    if (this.selectedCategoryId !== null) {
      this.products = this.stockService.getProductsByCategory(this.selectedCategoryId);
    }
  }
  updateStock() {
    if (this.stockForm.valid) {
      const { productId, quantity, type } = this.stockForm.value;
      const change = type === 'entry' ? quantity : -quantity;
      this.stockService.updateProductQuantity(this.selectedCategoryId!, productId, change);
      this.onCategoryChange();
      alert(`Produto atualizado com sucesso!`);
    }
  }
  

}
