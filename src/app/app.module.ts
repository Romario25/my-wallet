import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthModule} from './auth/auth.module';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthGuard} from './shared/services/auth.guard';
import {NotFoundComponent} from './shared/not-found/not-found.component';




@NgModule({
  declarations: [
    AppComponent, NotFoundComponent
  ],
  imports: [
      BrowserModule,
      AppRoutingModule,
      AuthModule,
      HttpClientModule,
      BrowserAnimationsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
