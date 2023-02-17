import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './store/reducers/events.reducer';
import { EffectsModule } from '@ngrx/effects';
import { EventsEffect } from './store/effects/events.effect';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EventsService } from './services/events.service';
import { RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([EventsEffect]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      autoPause: true // Pauses recording actions and state changes when the extension window is not open
    }),
    RouterOutlet,
    BrowserAnimationsModule,
  ],
  providers: [HttpClient, EventsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
