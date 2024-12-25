import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';
import { CartNewService } from '../../services/cartNew.service';
import { ColorchangesDirective } from '../directives/colorchanges.directive';
import { CustomPipe } from '../pipes/custom.pipe';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule,ColorchangesDirective, CustomPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartProducts: any = [];
  prodcutId: any;
  totalCartValue: any;
  individualCartValues: any = [];

  cartData: any = [];
  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private cartNewService: CartNewService
  ) {}

  ngOnInit(): void {
    // this.getCartProducts();
    this.cartData = this.cartNewService.getCartData();
  }

  getCartProducts() {
    this.cartService.getCartItems().subscribe((data: any) => {
      this.totalCartValue = data.reduce(
        (total: any, item: any) => (total += item.cartValue),
        0
      );
      console.log('this.totalCartValue', this.totalCartValue);
      this.cartProducts = data;
    });
  }

  deleteCartItems(id: any) {
    this.cartService.deleteCartItem(id).subscribe((item) => {
      console.log(item);
      this.getCartProducts();
    });
  }

  decreasedCartItemObject(product: any) {
    if (!product || !product.id) {
      console.error('Invalid product:', product);
      return null;
    }
    const getIndex = this.cartProducts.findIndex(
      (item: any) => item.id === product.id
    );
    if (getIndex === -1) {
      console.error('Product not found in cart:', product);
      return null;
    }

    let updatedProduct;
    if (this.cartProducts[getIndex].cartQuantity > 1) {
      this.cartProducts[getIndex].cartValue =
        (this.cartProducts[getIndex].cartQuantity - 1) *
        this.cartProducts[getIndex].price;

      updatedProduct = {
        ...this.cartProducts[getIndex],
        cartQuantity: this.cartProducts[getIndex].cartQuantity - 1,
      };
    } else {
      console.log('Cannot decrease quantity further. Quantity is already 1.');
      return this.cartProducts[getIndex];
    }

    return updatedProduct;
  }

  decreaseCartValue(product: any) {
    const newUpdateProduct = this.decreasedCartItemObject(product);
    this.updatecartValue(newUpdateProduct, newUpdateProduct.id);
    this.getCartProducts();
  }
  increaseCartValue(product: any) {
    const neUpadatedProduct = this.gettheUpdateCartObject(product);
    this.updatecartValue(neUpadatedProduct, neUpadatedProduct.id);
    this.getCartProducts();
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
    const getIndex = this.cartProducts.findIndex(
      (item: any) => item.id == product.id
    );
    this.cartProducts[getIndex].cartValue =
      (this.cartProducts[getIndex].cartQuantity + 1) *
      this.cartProducts[getIndex].price;
    const neUpadatedProduct = {
      ...this.cartProducts[getIndex],
      cartQuantity: this.cartProducts[getIndex].cartQuantity + 1,
    };
    return neUpadatedProduct;
  }
}
