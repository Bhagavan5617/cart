import { CommonModule } from '@angular/common';
import { Component, inject, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  private modalService = inject(NgbModal);


	open(content: TemplateRef<any>) {
		this.modalService.open(content, { size: 'lg' }).result.then(
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
