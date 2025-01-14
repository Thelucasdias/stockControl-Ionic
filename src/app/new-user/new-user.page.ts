import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from '../shared/user-form/user-form.component';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.page.html',
  styleUrls: ['./new-user.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule, UserFormComponent]
})
export class NewUserPage implements OnInit {
  newUserForm!: FormGroup;

  constructor(private fb: FormBuilder, private toastController: ToastController) { }

  ngOnInit() {
    this.newUserForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]]
    }, { validators: this.matchPasswords });
  }

  matchPasswords(group: FormGroup) {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');

    if (password && confirmPassword) {
      const mismatch = password.value !== confirmPassword.value;
      if (mismatch) {
        confirmPassword.setErrors({ mismatch: true });
      } else {
        const errors = confirmPassword.errors;
        if (errors) {
          delete errors['mismatch'];
          if (Object.keys(errors).length === 0) {
            confirmPassword.setErrors(null);
          }
        }
      }
    }

    return null;
  }


  onSubmit() {
    if (this.newUserForm.valid) {
      const formData = this.newUserForm.value;
      const formDataJson = JSON.stringify(formData);
      localStorage.setItem('dadosCadastro', formDataJson);
      this.presentToast('Cadastro realizado com sucesso!');
      console.log('Usuário criado com sucesso!')
      console.log(localStorage.getItem('dadosCadastro'));
    } else {
      console.log('Formulário inválido!');
    }
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    toast.present();
  }
}

