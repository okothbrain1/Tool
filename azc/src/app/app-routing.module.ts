import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./page/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'intro',
    loadChildren: () => import('./page/intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./page/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./page/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'crud',
    loadChildren: () => import('./page/crud/crud.module').then( m => m.CrudPageModule)
  },
  {
    path: 'newsurvey',
    loadChildren: () => import('./pages/newsurvey/newsurvey.module').then( m => m.NewsurveyPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'ff',
    loadChildren: () => import('./pages/ff/ff.module').then( m => m.FfPageModule)
  },
  {
    path: 'sent',
    loadChildren: () => import('./pages/sent/sent.module').then( m => m.SentPageModule)
  },
  {
    path: 'notsent',
    loadChildren: () => import('./pages/notsent/notsent.module').then( m => m.NotsentPageModule)
  },
  {
    path: 'update',
    loadChildren: () => import('./pages/update/update.module').then( m => m.UpdatePageModule)
  },
  {
    path: 'agent',
    loadChildren: () => import('./pages/agent/agent.module').then( m => m.AgentPageModule)
  },
  {
    path: 'beneficiary',
    loadChildren: () => import('./pages/beneficiary/beneficiary.module').then( m => m.BeneficiaryPageModule)
  },
  {
    path: 'modal-popup',
    loadChildren: () => import('./modal-popup/modal-popup.module').then( m => m.ModalPopupPageModule)
  },
  //{
    //path: 'casaupdate',
    //loadChildren: () => import('./casaupdate/casaupdate.module').then( m => m.CasaupdatePageModule)
  //},
  {
    path: 'casaupdate',
    loadChildren: () => import('./pages/casaupdate/casaupdate.module').then( m => m.CasaupdatePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
