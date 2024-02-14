import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimationsAsync(), 
    importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"flight-tracker-demo-468c7","appId":"1:50393243705:web:0fa935d6af593b4e052de8","storageBucket":"flight-tracker-demo-468c7.appspot.com","apiKey":"AIzaSyACBoekYtP1KFyJMDySrAqPvg2QvvwKeZ8","authDomain":"flight-tracker-demo-468c7.firebaseapp.com","messagingSenderId":"50393243705"}))), 
    importProvidersFrom(provideAuth(() => getAuth())), 
    importProvidersFrom(provideDatabase(() => getDatabase())), 
    provideAnimationsAsync(), 
  ]
};
