import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';

import { routes } from './app.routes'; // Importa tus rutas desde el archivo correspondiente

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Proveer configuración de enrutador con tus rutas
    provideClientHydration(), // Proveer soporte para la rehidratación del cliente
  ],
};
