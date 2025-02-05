import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Product } from '../../models/product.model';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ProductFormComponent {
  @Output() productAdded = new EventEmitter<void>();

  productForm: FormGroup;
  categories: any[] = [];
  selectedCategoryId: number | null = null;

  constructor(private fb: FormBuilder, private inventoryService: InventoryService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0.01)]],
      supplier: [''], 
      minimum: [null], 
      categoryId: [null, Validators.required]
    });
    this.categories = this.inventoryService.getCategories();
  }