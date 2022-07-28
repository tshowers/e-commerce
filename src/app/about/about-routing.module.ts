import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
    { path: '', component: OverviewComponent, data: { title: 'Overview' } },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
    ]
})

export class AboutRoutingModule { }