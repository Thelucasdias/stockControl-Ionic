import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProductFormComponent } from '../../shared/product-form/product-form.component';
import { CategoryManagerComponent } from 'src/app/shared/category-manager/category-manager.component';

@Component({
  selector: 'app-stock-movement',
  templateUrl: './stock-movement.page.html',
  styleUrls: ['./stock-movement.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ProductFormComponent, CategoryManagerComponent]
})
export class StockMovementPage {}
