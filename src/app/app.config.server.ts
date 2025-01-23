import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config'; // Asegúrate de que appConfig esté correctamente exportado

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(), // Proveer soporte para renderizado del servidor
  ],
};

// Combinar la configuración de la aplicación con la configuración del servidor
export const config = mergeApplicationConfig(appConfig, serverConfig);
