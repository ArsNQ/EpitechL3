import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

export class ChatService {
  private url = 'http://localhost:3000';
  private socket;

  constructor(pseudo: string, chanel: string) {
    this.socket = io(this.url, {query: `pseudo=${pseudo}&room=${chanel}`});
  }

  public sendMessage(message) {
    this.socket.emit('sendchat', message);
  }

  /*public getMessages = () => {
    return Observable.create((observer) => {
      this.socket.on('chat message', (message) => {
        console.log(message);
        observer.next(message);
      });
    });
  }*/

  public updateChat = () => {
    return Observable.create((observer) => {
      this.socket.on('updatechat', (username, message) => {
        console.log(message);
        observer.next(username, message);
      });
    });
  }
}
