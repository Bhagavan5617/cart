import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  selectedCategory:any ;
  categories:any = []
  isFixed:boolean =false;
  
  @HostListener('window:scroll',[])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isFixed = scrollPosition > 100; 

  }
  private modalService = inject(NgbModal);
  private productService = inject(ApiService)
  cartItemValue: any;
  constructor(private cartService:CartService){
    
  }
cartValue(){
   return this.cartService.cartItem$.subscribe(
    data => {
      console.log(data);
      this.cartItemValue = data.length;
      return data;
    }
   );
  }
  ngOnInit(): void {
    this.productService.getCategoriesObservable().subscribe(
      categories => {
        this.categories = categories;
      },
      error => {
        console.error('Error fetching categories:', error);
      }
    );
  console.log( this.cartValue())

  }
  
    open() {
      this.modalService.open(LoginComponent).result.then(
        (result) => {
          
        },			
      );
    }
    onCategorySelect  (category: string): void {
      this.selectedCategory = category;
      if (category) {
        this.productService.getProductsByCategory(category).subscribe(
          products => {
            console.log(category);
            this.productService.updateProducts(products);
          },
          error => {
            console.error('Error fetching products:', error);
          }
        );
      }
    }
}
