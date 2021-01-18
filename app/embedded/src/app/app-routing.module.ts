import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeatureSelectionComponent } from './feature-selection/feature-selection.component';
import { LimeComponent } from './lime/lime.component';
import { RuleComponent } from './rule/rule.component';

const routes: Routes = [
  { path: 'lime', component: LimeComponent },
  { path: 'rule', component: RuleComponent },
  { path: 'fs', component: FeatureSelectionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
