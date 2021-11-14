import { Component, OnInit, Inject } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import * as io from 'socket.io-client';
import { DOCUMENT } from '@angular/common';
import { Observable  } from 'rxjs';
import { ChatService } from '../../chat.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  private url = 'http://localhost:3000';
  private socket;
  htmlContent: string;
  inputMessage: HTMLInputElement;
  MessageZone: HTMLElement;
  li: HTMLElement;
  chanelName: string;
  pseudo: string;
  messages: string[] = [];
  chatService: ChatService;
  constructor() {
    this.pseudo = window.prompt('Entrez un pseudo');
    this.chanelName = 'chanel1';
    this.htmlContent = '';
    this.socket = io(this.url, {query: `pseudo=${this.pseudo}&room=${this.chanelName}`});
  }

  sendMessage() {
    this.inputMessage = document.getElementById('input') as HTMLInputElement;
    this.socket.emit('sendchat', this.inputMessage.value);
    // this.chatService.sendMessage(this.inputMessage.value);
  }

  selectChanel(value: string) {
    this.chanelName = value;
    this.pseudo = 'martin';
    // this.chatService = new ChatService(this.pseudo, this.chanelName);
    this.socket.emit('switchRoom', this.chanelName);
    console.log('number', value);
  }

  /*ngOnInit() {
    this.chatService
      .getMessages()
      .subscribe((message: string) => {
        this.MessageZone = document.getElementById('messages') as HTMLElement;
        this.li = document.createElement('li');
        this.li.innerText = message;
        this.MessageZone.appendChild(this.li);
        this.messages.push(message);
        console.log(this.messages);
      });
  }*/

  ngOnInit() {
    this.socket.on('updatechat', ((username, data) => {
      this.MessageZone = document.getElementById('messages') as HTMLElement;
      this.htmlContent = this.htmlContent + '<b>' + username + ':</b> ' + data + '<br>';
    }));
  }
}
