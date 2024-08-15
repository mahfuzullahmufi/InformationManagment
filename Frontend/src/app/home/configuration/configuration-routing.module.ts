import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuSettingComponent } from './menu-setting/menu-setting.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'menu-setting', component: MenuSettingComponent },
  { path: 'not-found', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
