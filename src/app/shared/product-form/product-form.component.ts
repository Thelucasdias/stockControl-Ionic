import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Product } from '../../models/product.model';
import { InventoryService } from 'src/app/services/inventory.service';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class ProductFormComponent implements OnInit {
  @Output() stockUpdated = new EventEmitter<void>();

  productForm: FormGroup;
  categories: any[] = [];
  products: Product[] = [];

  constructor(private fb: FormBuilder, private inventoryService: InventoryService, private stockService: StockService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0.01)]],
      supplier: [''],
      minimum: [null],
      categoryId: [null, Validators.required],
      productId: [''],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.categories = this.inventoryService.getCategories();
  }

  onCategoryChange() {
    const categoryId = this.productForm.get('categoryId')?.value;
    if (categoryId) {
      this.products = this.stockService.getProductsByCategory(categoryId);
    }
  }

  updateStock() {
    if (this.productForm.valid) {
      const { categoryId, productId, name, price, supplier, minimum, quantity } = this.productForm.value;
      let product = this.products.find(p => p.id === productId);
      
      if (!product) {
        product = new Product(crypto.randomUUID(), name, 0, price, supplier || '', minimum ?? 0);
        this.stockService.addProduct(categoryId, product);
      }
      
      this.stockService.updateProductQuantity(categoryId, product.id, quantity);
      this.onCategoryChange();
      alert(`Estoque atualizado com sucesso!`);
      this.stockUpdated.emit();
      this.productForm.reset();
    }
  }
}
