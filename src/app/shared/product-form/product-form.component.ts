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
  product: Product | null = null;
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
      quantity: [1, [Validators.required, Validators.min(1)]],
      date: [new Date(), Validators.required]
    });
  }

  ngOnInit() {
    this.categories = this.inventoryService.getCategories();
  }

  onCategoryChange() {
    const categoryId = this.productForm.get('categoryId')?.value;
    if (categoryId) {
      this.products = this.stockService.getProductsByCategory(categoryId);
      this.product = null; 
      this.productForm.patchValue({productId: ''})
    }
  }

  updateStock() {
    if (this.productForm.valid) {
      const { categoryId, productId, name, price, supplier, minimum, quantity, date } = this.productForm.value;
      this.product = this.products.find(p => p.id === productId) ?? null;

      if (!this.product) { // Novo produto
        this.product = new Product(
          crypto.randomUUID(),
          name,
          quantity,
          price,
          supplier || '',
          minimum ?? 0,
          date,
          quantity
        );
        this.stockService.addProduct(categoryId, this.product); // Salva o novo produto
      } else { // Produto existente
        // Atualize as propriedades do produto existente
        this.product.name = name;
        this.product.price = price;
        this.product.supplier = supplier || '';
        this.product.minimum = minimum ?? 0;
        this.product.quantity = quantity;
        this.product.date = date;

        this.inventoryService.updateProduct(categoryId, this.product); // Salva as alterações no produto existente
      }
    }
  }
}
