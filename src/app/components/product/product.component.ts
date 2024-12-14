import { Component } from '@angular/core';
import { NgbRatingConfig, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgbRatingModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  constructor(config: NgbRatingConfig) {
  
      config.max = 5;
      config.readonly = true;
    }
}
