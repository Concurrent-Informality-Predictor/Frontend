import { Component } from '@angular/core';
import { FormComponent } from './shared/components/form.component';
import { LandingComponent } from './shared/components/landing.component';

@Component({
  selector: 'app-root',
  imports: [FormComponent, LandingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'inf-front';
}
