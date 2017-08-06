import {Component, OnInit, Input} from '@angular/core';
import {MessageVM} from "../message-section/message.vm";

@Component({
  selector: 'chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {

    @Input()
    message: MessageVM;

  constructor() { }

  ngOnInit() {
  }

}
