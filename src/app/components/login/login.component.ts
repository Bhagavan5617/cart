import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(public activeModal: NgbActiveModal) {}
  isLogin: boolean = false;
  closeModal() {
    this.activeModal.close();
  }

openLogin(){
  this.isLogin = !this.isLogin;
}

}
