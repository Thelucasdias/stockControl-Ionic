import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private toastController: ToastController) {
  }
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      const storedData = JSON.parse(localStorage.getItem('users') || '{}')
      const user = storedData.find(
        (u: any) => u.email === formValue.email && u.password === formValue.password
      );
  
      if (user) {
        this.presentToast('Login bem-sucedido!');
        console.log('Usuário logado:', user);
      } else {
        this.presentToast('Senha ou email incorretos!');
        console.log('Tentativa de login com:', formValue);
      }
    }
  }
  
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
    });
    toast.present()
  }

};



