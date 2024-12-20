import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgbRatingModule, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  productData: any ={};
  productId: any = null;
  constructor(
    private route: ActivatedRoute,
    config: NgbRatingConfig,
    private productservice: ApiService,
    private cartService: CartService
  ) {
    config.max = 5;
    config.readonly = true;
  }
  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    console.log(this.productId);
    if (this.productId) {
      this.getProductData(this.productId);
    }
  }

  getProductData(id: any) {
    this.productservice.getAllProducts().subscribe(
      (data: any) => {
        const products = data.find((item: any) => item.id == id);
        if (products) {
          this.productData = products;
          console.log(products);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  addToCart(product: any) {
    this.cartService.addToCart(product).subscribe(
      data => console.log(data)
    )
  
  }
  increaseCartValue(productId: any) {
   
  }
  decreaseCartValue(productId: any) {

  }
}
