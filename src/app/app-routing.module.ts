import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';

import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component'
import { NavbarComponent } from './components/navbar/navbar.component'
import { PlayerlistComponent } from './components/playerlist/playerlist.component';
import { AddSeriesComponent } from './components/add-series/add-series.component';
import { SeriesDetailsComponent } from './components/series-details/series-details.component';
import { StatsComponent } from './components/stats/stats.component';


const routes: Routes = [
  {path:'', component:HomeComponent,data: { title: 'KBRugs' }},
  {path:'login', component:LoginComponent, data: { title: 'Login' }},
  {path:'register', component:RegisterComponent, data: { title: 'Register' }},
  {path:'players', component:PlayerlistComponent, data:{tite:'Players'}},
  {path:'series/add', component:AddSeriesComponent, data:{title:'Add-Series'}},
  {path:'series/:id', component:SeriesDetailsComponent, data:{title:'Series-Details'}},
  {path:'stats', component:StatsComponent, data:{title:'stats'}}
]

@NgModule({
  exports:[RouterModule],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
