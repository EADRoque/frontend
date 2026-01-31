import { Routes } from '@angular/router';
import { GratitudeJarComponent } from './features/gratitude-jar/gratitude-jar.component';
import { ScriptureTreeComponent } from './features/scripture-tree/scripture-tree.component';

export const routes: Routes = [
  { path: '', redirectTo: 'gratitude', pathMatch: 'full' }, // Default to Gratitude Jar
  { path: 'gratitude', component: GratitudeJarComponent },
  { path: 'scriptures', component: ScriptureTreeComponent },
];