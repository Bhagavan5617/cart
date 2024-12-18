import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:4200/assets/db.json';  // Example URL
  private cart = new BehaviorSubject<any[]>([]);
  cartItem$ = this.cart.asObservable();

  constructor(private http: HttpClient) {
    this.loadCartFromDB();
  }

  private loadCartFromDB(): void {
    this.http.get<any>(this.apiUrl).subscribe(data => {
      if (data.cart) {
        this.cart.next(data.cart);
      }
    });
  }

  addToCart(product: any) {
    const currentCart = this.cart.value;

    const existingItem = currentCart.find((item: any) => item.id == product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentCart.push({ ...product, quantity: 1 });
    }

    this.cart.next([...currentCart]);
  }

  increaseQuantity(product: any) {
    const currentCart = this.cart.value;
    const itemIndex = currentCart.findIndex((item: any) => item.id === product.id);
  
    if (itemIndex > -1) {
      // Product exists in the cart, so increment the quantity
      currentCart[itemIndex].quantity += 1;
      const newProduct = { ...product};
      currentCart.push(newProduct);
    } else {
      // Product does not exist in the cart, so add it with quantity 1
      const newProduct = { ...product, quantity: 1 };
      currentCart.push(newProduct);
    }
  
    // Update the cart with the new state
    this.cart.next([...currentCart]);
  }
  

  decreaseCart(product: any) {
    const currentCart = this.cart.value;
    const itemIndex = currentCart.findIndex((item: any) => item.id === product.id);

    if (itemIndex > -1) {
      currentCart[itemIndex].quantity -= 1;
      if (currentCart[itemIndex].quantity <= 0) {
        currentCart.splice(itemIndex, 1);
      }
      this.cart.next([...currentCart]);
    }
  }

  getCartItems(): any[] {
    return this.cart.value;
  }
}
