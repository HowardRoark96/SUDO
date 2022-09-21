import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth-module/shared-module/guards/auth.guard';
import { MainComponent } from './main/main.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: MainComponent,
    children: [
      {
        path: 'main',
        component: PageNotFoundComponent
      },
      {
        path: 'game',
        loadChildren: () => import('../game-module/game.module').then(module => module.GameModule)
      },
      {
        path: 'statistic',
        component: PageNotFoundComponent
      }
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
