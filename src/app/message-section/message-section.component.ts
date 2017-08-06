import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {ApplicationState} from "../store/application-state";
import {Observable} from "rxjs";
import {MessageVM} from "./message.vm";
import {participantNameSelector} from "./participantNameSelector";
import {messagesSelector} from "./messagesSelector";

@Component({
  selector: 'message-section',
  templateUrl: './message-section.component.html',
  styleUrls: ['./message-section.component.css']
})
export class MessageSectionComponent implements OnInit {

    participantNames$: Observable<string>;
    messages$: Observable<MessageVM[]>;

  constructor(private store:Store<ApplicationState>) {

      this.participantNames$ = store.select(participantNameSelector);

      this.messages$ = store.select(messagesSelector);
  }

  ngOnInit() {
  }

}
