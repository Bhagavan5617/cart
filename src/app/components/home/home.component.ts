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
export class HomeComponent implements OnInit, OnDestroy {
  categories: any[] = [];
  products: any[] = [];
  cartItems: any = {};
  selectedCategory: string = '';
  private destroy$ = new Subject<void>();

  constructor(
    private productService: ApiService,
    config: NgbRatingConfig,
    private route: Router,
    private cartService: CartService
  ) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
    this.fetchCategories();
    this.fetchAllProducts();
    this.getCartData();

    this.productService.getProductsObservable().subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );

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

  getCartData() {
    return this.cartService
      .getCartItems()
      .subscribe((items) => (this.cartItems = items));
  }
  addToCart(product: any) {
    this.getCartData();
    const existingProduct = this.cartItems.some(
      (item: any) => item.id === product.id
    );
    const getIndex = this.cartItems.findIndex(
      (item: any) => item.id == product.id
    );
    const newProduct = {
      ...product,
      cartQuantity: 1,
      cartValue: product.price,
    };
    if (!existingProduct) {
      this.cartService.addToCart(newProduct).subscribe(
        (data) => {
          console.log('Product added:', data);
        },
        (error) => console.log('Error adding product:', error)
      );
    } else {
      const newUpdatedProduct = this.gettheUpdateCartObject(product);
      this.updatecartValue(newUpdatedProduct, newUpdatedProduct.id);
    }
    this.getCartData();
  }

  updatecartValue(product: any, id: any) {
    this.cartService.updateCart(product, id).subscribe(
      (data) => {
        console.log('Cart updated:', data);
        this.cartService.updateCartState();
      },
      (error) => console.log('Error updating cart:', error)
    );
  }

  gettheUpdateCartObject(product: any) {
    if (!this.cartItems || !Array.isArray(this.cartItems)) {
      console.error('cartItems is not defined or not an array');
      return null;
    }
    const getIndex = this.cartItems.findIndex((item: any) => item.id === product.id);
    if (getIndex === -1) {
      console.error('Product not found in cart:', product);
      return null;
    }
    const cartItem = this.cartItems[getIndex];
    if (!cartItem) {
      console.error('Cart item at index is undefined:', getIndex);
      return null;
    }
    cartItem.cartValue = (cartItem.cartQuantity + 1) * cartItem.price;
    const updatedProduct = {
      ...cartItem,
      cartQuantity: cartItem.cartQuantity + 1,
    };  
    return updatedProduct; 
  }
  
  deleteCartItem(id: any) {
    this.cartService.deleteCartItem(id).subscribe((data) => {
      console.log(data);
    });
  }
  decreasedCartItemObject(product: any) {
    const getIndex = this.cartItems.findIndex(
      (item: any) => item.id == product.id
    );
    if (this.cartItems[getIndex].cartQuantity > 0) {
      this.cartItems[getIndex].cartValue =
        (this.cartItems[getIndex].cartQuantity - 1) *
        this.cartItems[getIndex].price;
    }
    const neUpadatedProduct = {
      ...this.cartItems[getIndex],
      cartQuantity: this.cartItems[getIndex].cartQuantity - 1,
    };
    return neUpadatedProduct;
  }

  decreaseCartValue(product: any) {
    console.log('product that is clicked');   
    const newUpdateProduct = this.decreasedCartItemObject(product);
    this.updatecartValue(newUpdateProduct, newUpdateProduct.id);
    this.getCartData();
  }
  increaseCartValue(product: any) {  
    this.getCartData();
    const neUpadatedProduct = this.gettheUpdateCartObject(product);
    this.updatecartValue(neUpadatedProduct, neUpadatedProduct.id);   
  }
}
