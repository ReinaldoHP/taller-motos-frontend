import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core'; // Importa esta función
import { ReactiveFormsModule } from '@angular/forms'; // Importa ambos módulos
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(ReactiveFormsModule), // Añade aquí FormsModule y ReactiveFormsModule
  ],
}).catch((err) => console.error(err));
