import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'

import { AppComponent } from './app.component'
import { LoginComponent } from './components/login/login.component'
import { MapComponent } from './components/map/map.component'
import { routing } from './app.routes'

import { MapService } from './services/map.service'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    MapService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
