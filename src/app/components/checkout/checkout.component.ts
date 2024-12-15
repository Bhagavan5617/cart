import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddressComponent } from '../address/address.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-checkout',
  standalone: true, 
  imports: [CommonModule,RouterModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
 private modalService = inject(NgbModal);


  open() {
    this.modalService.open(AddressComponent, { size: 'lg' }).result.then(
      (result) => {
        
      },			
    );
  }
}
