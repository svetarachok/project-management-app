import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { MaterialModule } from './material.module';
import { CoreModule } from './core/core.module';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './core/services/interceptors';

import { environment } from 'src/environments/environment';
import { UserEffects } from './core/store/effects/user.effects';
import { BoardsEffects } from './core/store/effects/boards.effects';
import { ColumnsEffects } from './core/store/effects/columns.effects';
import { TasksEffects } from './core/store/effects/tasks.effect';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule,
    StoreModule,
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    CoreModule,
    HttpClientModule,
    EffectsModule.forRoot([
      BoardsEffects,
      UserEffects,
      ColumnsEffects,
      TasksEffects,
    ]),
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
