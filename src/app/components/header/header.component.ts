import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isFixed:boolean =false;
  @HostListener('window:scroll',[])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isFixed = scrollPosition > 100; 
  }
  private modalService = inject(NgbModal);
  
  
    open() {
      this.modalService.open(LoginComponent).result.then(
        (result) => {
          
        },			
      );
    }
}
