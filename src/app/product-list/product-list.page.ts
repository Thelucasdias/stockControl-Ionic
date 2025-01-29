import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class ProductListPage implements OnInit {

  categories: string[] = [];
  newCategory: string = '';
  constructor() { }

  ngOnInit() {
    const categoriesSave = JSON.parse(localStorage.getItem('categories') || '[]');
    this.categories = categoriesSave;
  }
  addCategory(){
    if (this.newCategory.trim()){
      this.categories.push(this.newCategory.trim());
      localStorage.setItem('categories', JSON.stringify(this.categories));
      this.newCategory = '';
    }
  }
}