import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Product } from '../../models/product.model';
import { InventoryService } from 'src/app/services/inventory.service';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class ProductFormComponent implements OnInit {
  product: Product | null = null;
  @Output() stockUpdated = new EventEmitter<void>();

  productForm: FormGroup;
  categories: any[] = [];
  products: Product[] = [];

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private stockService: StockService,
    private toastCtrl: ToastController,
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0.01)]],
      supplier: [''],
      minimum: [null],
      categoryId: [null, Validators.required],
      productId: [''],
      quantity: [1, [Validators.required, Validators.min(1)]],
      date: [new Date(), Validators.required],
      client: [''],
      salePrice: [null],
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'top',
      color: 'success',
    });
    await toast.present();
  }

  ngOnInit() {
    this.categories = this.inventoryService.getCategories();
  }

  onCategoryChange() {
    const categoryId = this.productForm.get('categoryId')?.value;
    if (categoryId) {
      this.products = this.stockService.getProductsByCategory(categoryId);
      this.product = null;
      this.productForm.patchValue({ productId: '' });
    }
  }

  createProduct() {
    if (this.productForm.valid) {
      const {
        categoryId,
        productId,
        name,
        price,
        supplier,
        minimum,
        quantity,
        date,
      } = this.productForm.value;
      this.product = this.products.find((p) => p.id === productId) ?? null;

      if (!this.product) {
        this.product = new Product(
          crypto.randomUUID(),
          name,
          quantity,
          price,
          supplier || '',
          minimum ?? 0,
          date,
          quantity,
        );
        this.stockService.addProduct(categoryId, this.product);
        this.presentToast('Produto adicionado!');
        this.productForm.reset({
          name: '',
          price: null,
          supplier: '',
          minimum: null,
          categoryId: null,
          productId: '',
          quantity: 1,
          date: new Date(),
        });
      }
    }
  }
}
