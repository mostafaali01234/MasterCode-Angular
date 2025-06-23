import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth-interceptor.service';
import { provideStore } from '@ngrx/store';
import { languageReducer } from './store/language/languale.reducer';
import { provideEffects } from '@ngrx/effects';
import { LanguageEffect } from './store/language/language.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideStore({
        language: languageReducer
    }),
    provideEffects([LanguageEffect])
]
};
