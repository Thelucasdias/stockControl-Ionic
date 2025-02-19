import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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
  value: number = 0;
  client: string = '';


  constructor(private modalCtrl: ModalController) {
    this.productForm = new FormGroup({
      price: new FormControl(0),
      quantity: new FormControl(0),
    });
   }

  ngOnInit() {
    this.productForm.patchValue(this.product);
  }

  

  closeModal() {
    this.modalCtrl.dismiss();
  }

  confirmTransaction() {
    const updatedProduct = { ...this.product };

    

    if (this.transactionType === 'entrada') {
      updatedProduct.quantity += this.quantity;

   
    } else {
      updatedProduct.quantity -= this.quantity;
    }

    const total = { 
      total: this.productForm.value.price * this.productForm.value.quantity 
    };

    this.modalCtrl.dismiss({ updatedProduct, total});
  }
}