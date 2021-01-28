import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LimeComponent } from './lime/lime.component';
import { RuleComponent } from './rule/rule.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeatureSelectionComponent } from './feature-selection/feature-selection.component';
import { CommonModule } from '@angular/common';
import { IdHttpInterceptor } from './idInterceptor';
import { ValueSelectionComponent } from './value-selection/value-selection.component';

@NgModule({
  declarations: [
    AppComponent,
    LimeComponent,
    RuleComponent,
    FeatureSelectionComponent,
    ValueSelectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    //materials
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    CommonModule      
  ],
  providers: [
    {
       provide: HTTP_INTERCEPTORS,
       useClass: IdHttpInterceptor,
       multi: true
     }  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
