import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { BoardsModule } from './boards/boards.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    AuthModule,
    CoreModule,
    UserModule,
    BoardsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
