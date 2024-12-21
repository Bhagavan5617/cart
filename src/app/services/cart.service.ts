import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:3000/cart'; // Example URL
  private cartSubject = new BehaviorSubject<any[]>([]);
  cartItem$ = this.cartSubject.asObservable();
  

  constructor(private http: HttpClient) {}

  getCartItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data => {
        return data;
      }),
      tap(data => {
        this.cartSubject.next(data);
      }),
      catchError((error) => {
        console.error('Failed to fetch cart items', error);
        throw error;
      })
    );
  }

  updateCart(product: any, id:any) {
    return this.http.put<any>(`${this.apiUrl}/${id}`, product);
  }

  addToCart(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, product).pipe(
      tap((product) => {
        this.cartSubject.next(product);
      }),
      catchError((error) => {
        console.error('Failed to update cart', error);
        throw error;
      })
    );
  }

  deleteCartItem(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      tap(
        data => this.cartSubject.next(data)
      ),
      catchError((error) => {
        console.error('Failed to remove item from cart', error);
        throw error;
      })
    );
  }

  updateCartState(): void {
    this.getCartItems().subscribe((cartItems) => {
      this.cartSubject.next(cartItems);
    });
  }
}
