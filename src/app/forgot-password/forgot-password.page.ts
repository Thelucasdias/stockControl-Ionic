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

  constructor(private fb: FormBuilder, private toastController: ToastController) { }

  ngOnInit() {
    this.forgotForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]]
    })
  }

  onSubmit(){
    if (this.forgotForm.valid){
      
    }
  }

}
