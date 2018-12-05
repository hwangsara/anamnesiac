
import { markdown } from 'markdown';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PopoverController, Tabs, NavParams, ModalController } from '@ionic/angular';
import { Character } from '../models/character';


@Component({
  template: `
  <ion-content>
    <ion-list>
      <ion-list-header>Sort By</ion-list-header>
      <ion-item (click)="popoverCtrl.dismiss('alpha')"><ion-label>Character Name</ion-label></ion-item>
      <ion-item (click)="popoverCtrl.dismiss('weapon')"><ion-label>Character Weapon</ion-label></ion-item>
      <ion-item (click)="popoverCtrl.dismiss('tier')"><ion-label>Character Tier</ion-label></ion-item>
    </ion-list>
  </ion-content>
  `,
  styles: []
})
export class CharacterSortPopover {
  constructor(public popoverCtrl: PopoverController) {}
}
