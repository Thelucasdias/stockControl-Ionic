import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class ForgotPasswordPage implements OnInit {
  forgotForm!: FormGroup;
  recoveryTokens: { [key: string]: string } = {};
  currentStep: 'phone' | 'token' | 'newPassword' = 'phone';

  constructor(private fb: FormBuilder, private toastController: ToastController) { }

  ngOnInit() {
    this.forgotForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{9,15}$')]]
    })
  }

  async sendToken() {
    if (this.forgotForm.valid) {
      const phoneNumber = this.forgotForm.get('phoneNumber')?.value;
      const token = Math.floor(100000 + Math.random() * 900000).toString();
      this.recoveryTokens[phoneNumber] = token;

      console.log(`Token enviado para ${phoneNumber}: ${token}`);
      const toast = await this.toastController.create({
        message: `Token enviado para o número ${phoneNumber}. (Simulado: ${token})`,
        duration: 3000,
        position: 'top',
      });
      await toast.present();

      this.currentStep = 'token';
      this.forgotForm.addControl('token', this.fb.control('', [Validators.required]));

    }
  }
  async validateToken() {
    const phoneNumber = this.forgotForm.get('phoneNumber')?.value;
    const token = this.forgotForm.get('token')?.value;

    if (this.recoveryTokens[phoneNumber] === token) {
      const toast = await this.toastController.create({
        message: 'Token validado com sucesso!',
        duration: 2000,
        position: 'top',
      });
      await toast.present();

      this.currentStep = 'newPassword';
      this.forgotForm.removeControl('token');
      this.forgotForm.addControl('password', this.fb.control('', [Validators.required, Validators.minLength(6)]));
      this.forgotForm.addControl('confirmPassword', this.fb.control('', [Validators.required]));
    } else {
      const toast = await this.toastController.create({
        message: 'Token inválido. Tente novamente.',
        duration: 3000,
        position: 'top',
      });
      await toast.present();
    }
  }
  async resetPassword() {
    const phoneNumber = this.forgotForm.get('phoneNumber')?.value;
    const password = this.forgotForm.get('password')?.value;
    const confirmPassword = this.forgotForm.get('confirmPassword')?.value

    if (password !== confirmPassword) {
      const toast = await this.toastController.create({
        message: 'As senhas não coincidem!',
        duration: 3000,
        position: 'top',
      });
      await toast.present();
      return;
    }

    const newUserForm = localStorage.getItem('users');
    if (!newUserForm) {
      const toast = await this.toastController.create({
        message: 'Nenhum usuário encontrado!',
        duration: 3000,
        position: 'top',
      });
      await toast.present();
      return;
    }
    const users = JSON.parse(newUserForm)
    const userIndex = users.findIndex((user: any) => user.phoneNumber === phoneNumber)
    if (userIndex === -1) {
      const toast = await this.toastController.create({
        message: 'Usuário não encontrado!',
        duration: 3000,
        position: 'top',
      });
      await toast.present();
      return;
    }
    users[userIndex].password = password;
    localStorage.setItem('users', JSON.stringify(users));
    const toast = await this.toastController.create({
      message: 'Senha redefinida com sucesso!',
      duration: 3000,
      position: 'top',
    });
    await toast.present();

    window.location.href = 'http://localhost:8100/login';

  }
  onSubmit() {
    if (this.currentStep === 'phone') {
      this.sendToken();
    } else if (this.currentStep === 'token') {
      this.validateToken();
    } else if (this.currentStep === 'newPassword') {
      this.resetPassword();
    }
  }
}
