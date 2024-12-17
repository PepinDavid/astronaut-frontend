import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject, tap } from 'rxjs';

export interface IAstronaut {
  id?: number;
  name?: string;
  email?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IResponse {
  data: IAstronaut[] | number | IAstronaut;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AstronautsService {
  private _apiUrl = 'http://localhost:3000/api/astronauts';
  private astronautsSubject$ = new BehaviorSubject<IAstronaut[]>([]);

  constructor(private _http: HttpClient) { }

  getAll(): Observable<IAstronaut[]> {
    this._http.get<IResponse>(this._apiUrl)
    .subscribe({
      next: (data) => {
        this.astronautsSubject$.next(data.data as IAstronaut[])
        
      },
      error: (error) => {this.astronautsSubject$.error(error)}
    });

    return this.astronautsSubject$.asObservable();
  }

  getOne(id: number): Observable<IAstronaut> {
    const subAstronaut = new Subject<IAstronaut>();

    this._http.get<IResponse>(`${this._apiUrl}/${id}`)
    .subscribe({
      next: (data) => {
        this._refreshData();
        subAstronaut.next(data.data as IAstronaut)
      },
      error: (error) => {subAstronaut.error(error)}
    });

    return subAstronaut.asObservable();
  }

  create(astronaut: IAstronaut): Observable<IAstronaut> {
    const subAstronaut = new Subject<IAstronaut>();

    this._http.post<IResponse>(this._apiUrl, astronaut)
    .subscribe({
      next: (data) => {
        this._refreshData();
        subAstronaut.next(data.data as IAstronaut)
      },
      error: (error) => {subAstronaut.error(error)}
    });

    return subAstronaut.asObservable();
  }

  update(id: number, astronaut: IAstronaut): Observable<IAstronaut> {
    const subAstronaut = new Subject<IAstronaut>();

    this._http.put<IResponse>(`${this._apiUrl}/${id}`, astronaut)
    .subscribe({
      next: (data) => {
        this._refreshData();
        subAstronaut.next(data.data as IAstronaut);
      },
      error: (error) => {subAstronaut.error(error)}
    });

    return subAstronaut.asObservable();
  }

  delete(id: number): void {
    this._http.delete<void>(`${this._apiUrl}/${id}`)
    .subscribe({
      next: () => this._refreshData(),
      error: (error) => {console.error(error)}
    });
  }

  private _refreshData(): void {
    this.getAll().subscribe();
  }
}
