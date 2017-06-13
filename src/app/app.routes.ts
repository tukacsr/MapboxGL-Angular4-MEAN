import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { AppComponent } from './app.component'
import { LoginComponent } from './components/login/login.component'
import { MapComponent } from './components/map/map.component'

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'map', component: MapComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);