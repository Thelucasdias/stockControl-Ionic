import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: 'index.page.html',
  styleUrls: ['index.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
})
export class IndexPage implements OnInit {
  indexForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastController: ToastController,
    private router: Router,
  ) {}

  ngOnInit() {
    this.indexForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.indexForm.valid) {
      const formValue = this.indexForm.value;
      const storedData = JSON.parse(localStorage.getItem('users') || '[]');
      const user = storedData.find(
        (u: any) =>
          u.email === formValue.email && u.password === formValue.password,
      );

      if (user) {
        console.log('Usuário logado:', user);
        this.router.navigate(['/home']);
      } else {
        this.presentToast('Senha ou email incorretos!', 'danger');
        console.log('Tentativa de index com:', formValue);
      }
    }
  }

  async presentToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
    });
    toast.present();
  }
}
