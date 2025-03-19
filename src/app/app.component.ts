import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importamos CommonModule
import { RouterOutlet } from '@angular/router';
import { UsuarioComponent } from "./usuario/usuario.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, UsuarioComponent, LoginComponent, RegisterComponent], // Añadimos CommonModule a los imports
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {
  title = 'angular-seminari6';
  loggedin: boolean = false;
  showRegisterComponent: boolean = false;

  getLoggedIn(loggedin: boolean) {
    this.loggedin = loggedin;
  }

  showRegister() {
    this.showRegisterComponent = true;
  }

  showLogin() {
    this.showRegisterComponent = false;
  }
}