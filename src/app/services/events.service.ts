import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionEvent } from '../shared/interfaces/session-event.interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
private readonly api = 'https://br-fe-assignment.github.io/customer-events/events.json';


  constructor(private http: HttpClient) { }

  getEvents(): Observable<SessionEvent[]> {
    return this.http.get<{ events: SessionEvent[] }>(this.api)
      .pipe(map(result => result.events));
  }
}
