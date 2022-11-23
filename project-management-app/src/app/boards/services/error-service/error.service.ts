import { Injectable } from '@angular/core';

export interface ErrorMessage {
  message: string;
  statusCode: number;
}

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  getErrorMessage(message: ErrorMessage) {
    switch (message.statusCode) {
      case 400:
        return message.message;
      case 403:
        return message.message;
      case 404:
        return message.message;
      default:
        return 'Unknown error occured, please try again';
    }
  }
}
