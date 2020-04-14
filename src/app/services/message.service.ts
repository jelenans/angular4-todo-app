import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
  messages: string[] = [];
  /**
   * Toggles server logs
   */
  logEnabled: boolean = false;

  /**
   * Adds a new message to the MessageService
   *
   * @param  {string} message
   * @return {void}
   */
  add(message: string): void {
    this.messages.push(message);
  }

  /**
   * Clears all the messages from the MessageService
   * @return {void}
   */
  clear(): void {
    this.messages = [];
  }
}
