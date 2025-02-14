import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProductFormComponent } from '../shared/product-form/product-form.component';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.page.html',
  styleUrls: ['./product-add.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ProductFormComponent]
})
export class ProductAddPage {}
