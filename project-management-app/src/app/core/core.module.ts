import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { appReducers } from './store/reducers/app.reducers';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    WelcomePageComponent,
    NotFoundPageComponent,
    ConfirmModalComponent,
    SearchBarComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    StoreModule.forRoot(appReducers),
  ],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
