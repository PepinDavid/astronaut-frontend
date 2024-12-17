import { Component, OnInit } from '@angular/core';
import { AstronautsService, IAstronaut } from '../../services/astronauts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-astronaut-form',
  templateUrl: './astronaut-form.component.html',
  styleUrl: './astronaut-form.component.scss',
  imports: [
    ReactiveFormsModule,
  ]
})
export class AstronautFormComponent implements OnInit {
  astronautId: number;
  astronaut: IAstronaut = {}; 
  form: FormGroup;

  constructor(
    private _astronautsService: AstronautsService,
    private _fb: FormBuilder,
    private _activatedRouter: ActivatedRoute,
    private _router: Router,
  ) {
    this.astronautId = this._activatedRouter.snapshot.params['astronautId'];

    this.form = this._fb.group({
      id: [null],
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    if (this.astronautId) {
      this._astronautsService.getOne(this.astronautId)
      .subscribe((astronaut) => {
        this.form.setValue({
          id: astronaut.id,
          name: astronaut.name,
          email: astronaut.email,
        });
      });
    }
  }

  backClicked() {
    this._router.navigate(["astronauts"]);
  }

  get f() {
    return this.form?.controls;
  }

  onSubmit() {
    const values = this.form.value;
    const id = this.astronautId;

    if (id) {
      this._astronautsService.update(id, values).subscribe({
        next: (data) => {
          if (data) {
            this.form.reset();
            this._router.navigate(['astronauts']);
          }
        },
        error: (err) => {
          console.error(err);
        },
      });
    } else {
      this._astronautsService.create(values).subscribe({
        next: (data) => {
          if (data) {
            this.form.reset();
            this._router.navigate(['astronauts']);
          }
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }
}
