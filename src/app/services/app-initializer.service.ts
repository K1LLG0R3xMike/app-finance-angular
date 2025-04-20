import { Injectable } from '@angular/core';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../environments/firebaseConfig'; // Asegúrate de que la ruta sea correcta
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppInitializerService {
  static initializeApp: void | Observable<unknown> | Promise<unknown>;
  constructor() {}

  initApp(): Promise<void> {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const token = await user.getIdToken();
          try {
            await fetch('http://localhost:3001/api/auth/check', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            });
            console.log('Token enviado correctamente al backend.');
          } catch (error) {
            console.error('Error al enviar el token al backend:', error);
          }
        }
        resolve(); // Continuar con la carga de la app
      });
    });
  }
}
