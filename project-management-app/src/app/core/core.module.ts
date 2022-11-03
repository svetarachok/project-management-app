import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    WelcomePageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
