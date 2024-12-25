import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { cartData } from '../components/modals/cart';

@Injectable({
  providedIn: 'root',
})
export class CartNewService {
  baseUrl = 'http://localhost:3000/cart';

  constructor(private http: HttpClient) {}

  getCartData(): Observable<cartData[]> {
    return this.http.get<cartData[]>(this.baseUrl).pipe(shareReplay());
  }

  addCartToCart(cartItem: cartData): Observable<cartData> {
    return this.http.post<cartData>(this.baseUrl, cartItem);
  }

  updateCart(cartItem: cartData, id: string) {
    return this.http.put(`${this.baseUrl}/${id}`, cartItem);
  }

  


}
