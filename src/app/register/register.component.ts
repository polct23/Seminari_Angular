import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class RegisterComponent {
  formularioRegistro: FormGroup;
  authService = inject(AuthService); // Inyectamos el servicio de autenticación

  constructor(private form: FormBuilder) {
    this.formularioRegistro = this.form.group({
      email: ['', [Validators.required, Validators.email]], // Campo de email
      password: ['', [Validators.required, Validators.minLength(8)]] // Campo de contraseña
    });
  }

  register() {
    if (this.formularioRegistro.invalid) {
      this.formularioRegistro.markAllAsTouched();
      return;
    }

    const registerData = this.formularioRegistro.value;

    this.authService.register(registerData).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        alert('Usuario registrado con éxito');
      },
      error: (error) => {
        console.error('Error en el registro:', error);
        alert('Error en el registro, verifica los datos ingresados');
      }
    });
  }
}