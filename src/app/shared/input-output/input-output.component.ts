import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ModalController, IonicModule } from '@ionic/angular';
import { Product } from 'src/app/models/product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-output',
  templateUrl: './input-output.component.html',
  styleUrls: ['./input-output.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule, FormsModule]
})
export class InputOutputComponent {
  @Input() product!: Product;
  @Input() categoryId!: number;

  productForm: FormGroup;

  transactionType: 'entrada' | 'saida' = 'entrada';
  quantity: number = 0;
  client: string = '';
  date: Date | undefined;


  constructor(private modalCtrl: ModalController) {
    this.productForm = new FormGroup({
      price: new FormControl(0),
      quantity: new FormControl(0),
      client: new FormControl()

    });
  }


  closeModal() {
    this.modalCtrl.dismiss();
  }

  confirmTransaction() {    
    const quantity = this.quantity;
    const date = new Date();
    
    if (this.transactionType === 'entrada') {
      this.product.stockIn.push({ quantity, date });
      this.product.quantity += quantity;
    } else {
      if (quantity > this.product.quantity) {
        throw new Error("Sem estoque suficiente!");
      }
      this.product.stockOut.push({ quantity, date, client: this.productForm.value.client || '' });
      this.product.quantity -= quantity;
    }
  
    this.product.price = this.productForm.value.price || this.product.price;
    const updatedProduct = { ...this.product, total: this.product.quantity * this.product.price };

    this.modalCtrl.dismiss({ updatedProduct });
  }
  
}