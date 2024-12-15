import { CommonModule } from '@angular/common';
import { Component, inject, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddressComponent } from '../address/address.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  private modalService = inject(NgbModal);


	open() {
		this.modalService.open(AddressComponent, { size: 'lg' }).result.then(
			(result) => {
				
			},			
		);
	}
  openEditProfile(editprofile: TemplateRef<any>) {
		this.modalService.open(editprofile).result.then(
			(result) => {
				
			},			
		);
	}
}
