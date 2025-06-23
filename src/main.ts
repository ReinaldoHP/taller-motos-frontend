import { bootstrapApplication } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { authInterceptor } from './app/interceptors/auth.interceptor';
import { HttpErrorInterceptor } from './app/interceptors/http-error.interceptor';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    // Configura las rutas de la aplicación
    provideRouter(routes),

    // Configura HttpClient con interceptores
    provideHttpClient(
      withInterceptors([authInterceptor]) // Interceptor funcional (authInterceptor)
    ),

    // Registra el interceptor clásico (HttpErrorInterceptor)
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true, // Permite registrar múltiples interceptores
    },
  ],
}).catch((err) => console.error(err));
