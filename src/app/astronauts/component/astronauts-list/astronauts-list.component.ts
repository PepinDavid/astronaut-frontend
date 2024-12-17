import { Component, OnInit } from '@angular/core';
import { AstronautsService, IAstronaut } from '../../services/astronauts.service';
import { EntityListComponent } from '../../../entity/components/entity-list/entity-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-astronauts-list',
  imports: [
    EntityListComponent,
  ],
  templateUrl: './astronauts-list.component.html',
  styleUrl: './astronauts-list.component.scss',
  providers: [
    AstronautsService,
  ]
})
export class AstronautsListComponent implements OnInit {
  astronauts: IAstronaut[] = [];
  columns = [
    { header: 'Name', field: 'name' },
    { header: 'Email', field: 'email' },
  ];

  constructor(private _astronautService: AstronautsService, private _router: Router) {}

  ngOnInit(): void {
    this._astronautService.getAll().subscribe((data) => {
      this.astronauts = data;
    });
  }

  editAstronaut(astronaut: IAstronaut): void {
    this._router.navigate(['astronauts', 'modify', astronaut.id]);
  }

  deleteAstronaut(id: number): void {
    this._astronautService.delete(id);
  }
}
