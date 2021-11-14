import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import * as io from 'socket.io-client';
import { CookieService } from 'ngx-cookie-service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  private url = 'http://localhost:3000';
  private socket;
  htmlContent: string;
  messages = [];
  channels = [];
  inputMessage: HTMLInputElement;
  MessageZone: HTMLElement;
  li: HTMLElement;
  chanelName: string;
  currentRoom = '';
  pseudo: string;
  logout = false;

  constructor(private cookieService: CookieService) {
    if (this.cookieService.get( 'jwt')) {
      this.logout = true;
      const decode = jwt_decode(this.cookieService.get( 'jwt'));
      this.pseudo = decode.user.pseudo;
    } else {
      this.pseudo = window.prompt('Entrez un pseudo');
    }
    this.chanelName = 'Channel 1';
    this.htmlContent = '';
    this.socket = io(this.url, {query: `pseudo=${this.pseudo}&room=${this.chanelName}`});
  }

  sendMessage() {
    this.inputMessage = document.getElementById('input') as HTMLInputElement;
    this.socket.emit('sendchat', this.inputMessage.value);
  }

  selectChanel(value: string) {
    this.chanelName = value;
    // this.chatService = new ChatService(this.pseudo, this.chanelName);
    this.socket.emit('switchRoom', this.chanelName);
    console.log('number', value);
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  removeChannel(channel: string) {
    this.socket.emit('removeChannel', channel);
  }

  addChannel() {
    const newChannel = window.prompt('Nom du channel');
    this.socket.emit('switchRoom', newChannel);
  }

  ngOnInit() {
    this.socket.on('updatechat', ((username, data) => {
      const date = new Date();
      const hour = date.getHours() + ':' + date.getMinutes();
      console.log(hour);
      if (username === this.pseudo) {
        this.messages.push([username, data, hour, 1]);
      } else {
        this.messages.push([username, data, hour, 0]);
      }
    }));

    this.socket.on('updaterooms', ((rooms, currentRoom) => {
      console.log('rooms = ', rooms);
      console.log('current room = ', currentRoom);
      this.channels = rooms;
      this.currentRoom = currentRoom;
    }));
    this.scrollToBottom();
  }
}
