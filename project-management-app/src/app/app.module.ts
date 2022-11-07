import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { MaterialModule } from './material.module';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { BoardsModule } from './boards/boards.module';

import { AppComponent } from './app.component';

import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    StoreModule,
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    CoreModule,
    UserModule,
    BoardsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
