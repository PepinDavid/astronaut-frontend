import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrl: './entity-list.component.scss',
})
export class EntityListComponent {
  @Input() title!: string; 
  @Input() data!: any[];
  @Input() columns!: { header: string; field: string }[];

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<number>();
}
