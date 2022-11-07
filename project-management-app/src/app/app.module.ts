import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { MaterialModule } from './material.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { BoardsModule } from './boards/boards.module';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';


import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './core/services/interceptors'; 

import { environment } from 'src/environments/environment';
import { BoardsEffects } from './core/store/effects/boards.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    StoreModule,
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    AuthModule,
    CoreModule,
    UserModule,
    BoardsModule,
    HttpClientModule,
    EffectsModule.forRoot([BoardsEffects]),
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
