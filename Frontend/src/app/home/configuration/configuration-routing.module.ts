import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuSettingComponent } from './menu-setting/menu-setting.component';

const routes: Routes = [
  { path: 'menu-setting', component: MenuSettingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
