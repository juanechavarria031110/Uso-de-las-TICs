import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'; 
import { provideRouter } from '@angular/router'; 
import { routes } from './app.routes'; // Asegúrate de que esta línea sea correcta 
import { provideClientHydration } from '@angular/platform-browser'; 
 
export const appConfig: ApplicationConfig = { 
  providers: [ 
    provideRouter(routes), 
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), // Esto debe funcionar si routes está exportado correctamente 
    provideClientHydration() 
  ] 
}