import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgbRatingConfig, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../services/api.service';
import { Subject } from 'rxjs';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbRatingModule, CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit,OnDestroy {
  categories: any[] = [];
  products: any[] = [];
  selectedCategory: string = '';
  private destroy$ = new Subject<void>();

  constructor(
    private productService: ApiService,
    config: NgbRatingConfig,
    private route: Router,
    private cartService:CartService
  ) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
    this.fetchCategories();
    this.fetchAllProducts();

    this.productService.getProductsObservable().subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );

    // Subscribe to the shared observable for categories
    this.productService.getCategoriesObservable().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
    this.getObservableData();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  getObservableData() {
    this.productService
      .getCategoriesObservable()
      .subscribe((data: any) =>
        console.log('this is observable Categories data', data)
      );
    this.productService
      .getProductsObservable()
      .subscribe((data: any) =>
        console.log('this is observable Products data', data)
      );
  }

  fetchCategories(): void {
    this.productService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  fetchAllProducts(): void {
    this.productService.getAllProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching all products:', error);
      }
    );
  }

  onCategorySelect(name: string): void {
    this.selectedCategory = name;
    if (name) {
      console.log(name);
      this.fetchProductsByCategory(name);
    } else {
      this.fetchAllProducts();
    }
  }

  fetchProductsByCategory(category: string): void {
    this.productService.getProductsByCategory(category).subscribe(
      (data) => {
        this.products = data;
        console.log(this.products);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  onProductSelect(id: any) {
    this.route.navigate(['/product', id]);
  }

  addToCart(product: any) {
    console.log('Adding product to cart:', product);
    this.cartService.addToCart(product);
    console.log('Current cart items:', this.cartService.getCartItems());
  }

  increaseCartValue(product: any) {
    console.log('Increasing quantity for product ID:', product);
    this.cartService.increaseQuantity(product);
    console.log('Current cart items:', this.cartService.getCartItems());
  }

  decreaseCartValue(product: any) {
    console.log('Decreasing quantity for product ID:', product);
    this.cartService.decreaseCart(product);
    console.log('Current cart items:', this.cartService.getCartItems());
  }
}
