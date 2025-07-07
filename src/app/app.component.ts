import { Component } from '@angular/core';
import { FormComponent } from './shared/components/form.component';
import { LandingComponent } from './shared/components/landing.component';
import { BulkComponent } from './shared/components/bulk.component'
@Component({
  selector: 'app-root',
  imports: [FormComponent, LandingComponent, BulkComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'inf-front';
}
