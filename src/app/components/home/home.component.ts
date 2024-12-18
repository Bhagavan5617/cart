import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbRatingConfig, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbRatingModule, CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  categories: any[] = [];
  products: any[] = [];
  selectedCategory: string = '';


  constructor(private productService: ApiService, config: NgbRatingConfig) {
  
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
    this.fetchCategories();
    this.fetchAllProducts();

    this.productService.getProductsObservable().subscribe(
      products => {
        this.products = products;
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );

    // Subscribe to the shared observable for categories
    this.productService.getCategoriesObservable().subscribe(
      categories => {
        this.categories = categories;
      },
      error => {
        console.error('Error fetching categories:', error);
      }
    );




  }

  fetchCategories(): void {
    this.productService.getCategories().subscribe(
      data => {
        this.categories = data;
      },
      error => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  fetchAllProducts(): void {
    this.productService.getAllProducts().subscribe(
      data => {
        this.products = data;
      },
      error => {
        console.error('Error fetching all products:', error);
      }
    );
  }

  onCategorySelect(name: string): void {
    this.selectedCategory = name;
    if (name) {
      console.log(name)
      this.fetchProductsByCategory(name);
    } else {
      this.fetchAllProducts();  
    }
  }

  fetchProductsByCategory(category: string): void {
    this.productService.getProductsByCategory(category).subscribe(
      data => {
        this.products = data;
        console.log(this.products)
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }

}
