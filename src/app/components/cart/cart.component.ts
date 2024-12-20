import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartProducts: any =[];
  prodcutId: any;
  constructor(
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.prodcutId = this.route.snapshot.paramMap.get('id');
    this.cartService
      .getCartItems()
      .subscribe((data) => (this.cartProducts = data));   
  }

  getCartProducts() {}

  deleteCartItems(id: any) {}
}
