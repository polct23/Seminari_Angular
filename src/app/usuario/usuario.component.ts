import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  imports: [CommonModule, FormsModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css',
  standalone: true
})
export class UsuarioComponent implements OnInit {
  usuarios: any[] = []; // Lista de usuarios obtenidos de la API
  mostrardata: boolean = false;
  usuarioSeleccionado: any = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.authService.getUsuarios().subscribe({
      next: (response) => {
        this.usuarios = response.data; // Asignamos los usuarios obtenidos de la API
        console.log('Usuarios obtenidos:', this.usuarios);
      },
      error: (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    });
  }

  mostrardatos(usuario: any): void {
    this.usuarioSeleccionado = usuario;
    this.mostrardata = true;
  }

  confirmarEliminacion(): void {
    const usuariosSeleccionados = this.usuarios.filter(usuario => usuario.seleccionado);

    if (usuariosSeleccionados.length === 0) {
      alert('No hay usuarios seleccionados para eliminar.');
      return;
    }

    const confirmacion = confirm(`¿Estás seguro de que deseas eliminar ${usuariosSeleccionados.length} usuario(s)?`);
    if (confirmacion) {
      this.eliminarUsuarios(usuariosSeleccionados);
    }
  }

  eliminarUsuarios(usuariosSeleccionados: any[]): void {
    usuariosSeleccionados.forEach(usuario => {
      this.authService.deleteUsuario(usuario.id).subscribe({
        next: () => {
          console.log(`Usuario con ID ${usuario.id} eliminado.`);
          this.usuarios = this.usuarios.filter(u => u.id !== usuario.id); // Eliminamos el usuario de la lista local
        },
        error: (error) => {
          console.error(`Error al eliminar el usuario con ID ${usuario.id}:`, error);
        }
      });
    });
  }
}