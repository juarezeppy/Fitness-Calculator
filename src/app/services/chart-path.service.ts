import { Injectable }     from '@angular/core';
import {BehaviorSubject}  from 'rxjs/BehaviorSubject';

@Injectable()
export class ChartPathService {

  messageSource = new BehaviorSubject<string>('');
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.messageSource = new BehaviorSubject<string>('');
    this.currentMessage = this.messageSource.asObservable(); // create an observable to pass in the message when ready
    this.messageSource.next(message);
  }
}
