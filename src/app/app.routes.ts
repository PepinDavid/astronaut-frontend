import { Routes } from '@angular/router';
import { AstronautsListComponent } from './astronauts/component/astronauts-list/astronauts-list.component';
import { AstronautFormComponent } from './astronauts/component/astronaut-form/astronaut-form.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
    },
    {
        path: "astronauts",
        component: AstronautsListComponent,
    },
    {
        path: "astronauts/create",
        component: AstronautFormComponent,
    },
    {
        path: "astronauts/modify/:astronautId",
        component: AstronautFormComponent,
    },
];
