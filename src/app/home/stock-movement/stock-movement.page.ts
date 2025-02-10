import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProductFormComponent } from '../../shared/product-form/product-form.component';

@Component({
  selector: 'app-stock-movement',
  templateUrl: './stock-movement.page.html',
  styleUrls: ['./stock-movement.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ProductFormComponent]
})
export class StockMovementPage {}
