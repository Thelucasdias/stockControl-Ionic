import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../models/product.model';
import { StockService } from 'src/app/services/stock.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-product-modal',
  templateUrl: './edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.scss'],
  standalone: true,
    imports: [CommonModule, ReactiveFormsModule, IonicModule]
})
export class EditProductModalComponent {

  @Input() product!: Product;
  @Input() categoryId!: number;

  productForm: FormGroup;



  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private stockService: StockService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0.01)]],
      quantity: [null, [Validators.required, Validators.min(1)]],
      supplier: [''],
      minimum: [null],
      date: [new Date(), Validators.required]})
    }

    ngOnInit() {
      this.productForm.patchValue(this.product);
    }
  
    save() {
      if (this.productForm.valid) {
        const updatedProduct = { 
          ...this.product, 
          ...this.productForm.value,
          total: this.productForm.value.price * this.productForm.value.quantity 
        };
        this.modalCtrl.dismiss({ updatedProduct });
      }
    }
  
    deleteProduct() {
      this.stockService.deleteProduct(this.categoryId, this.product.id);
      this.modalCtrl.dismiss({ deleted: true });
    }
  
    dismiss() {
      this.modalCtrl.dismiss();
    }
  }
