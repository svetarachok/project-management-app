import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';

import { StoreModule } from '@ngrx/store';
import { appReducers } from './store/reducers/app.reducers';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    WelcomePageComponent
  ],
  imports: [
    CommonModule, 
    MaterialModule,
    StoreModule.forRoot(appReducers),
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ],
})
export class CoreModule { }
