import { markdown } from 'markdown';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PopoverController, Tabs, NavParams, ModalController } from '@ionic/angular';

import { Item } from '../models/item';

@Component({
  template: `
  <ion-content>
    <ion-list>
      <ion-list-header>Sort By</ion-list-header>
      <ion-item (click)="popoverCtrl.dismiss('alpha')"><ion-label>Item Name</ion-label></ion-item>
      <ion-item (click)="popoverCtrl.dismiss('element')"><ion-label>Item Element</ion-label></ion-item>
      <ion-item (click)="popoverCtrl.dismiss('type')"><ion-label>Item Type</ion-label></ion-item>
    </ion-list>
  </ion-content>
  `,
  styles: []
})
export class ItemSortPopover {
  constructor(public popoverCtrl: PopoverController) {}
}

@Component({
  template: `
  <ion-header>
    <ion-toolbar color="primary">
      <ion-title>{{ item.name }}</ion-title>
      <ion-buttons slot="end">
        <ion-button icon-only (click)="share()" *ngIf="showShare">
          <ion-icon name="share"></ion-icon>
        </ion-button>
        <ion-button (click)="dismiss()">
          Close
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content>

    <div class="stars small"></div>
    <div class="stars medium"></div>
    <div class="stars large"></div>

    <ion-row class="profile-row">
      <ion-col size-xs="6" size-md="3">
        <ion-img [src]="'assets/items/' + item.picture + '.png'" class="picture"></ion-img>
      </ion-col>

      <ion-col class="shrink-top-margin">
        <p>{{ item.star }}★ {{ type }}</p>
        <p>
          <span *ngIf="item.atk" class="middot-after">{{ item.atk }} ATK</span>
          <span *ngIf="item.int">{{ item.int }} INT</span>
          <span *ngIf="item.def">{{ item.def }} DEF</span>
        </p>
        <p>Obtained: {{ item.obtained }}</p>
      </ion-col>
    </ion-row>

    <ion-row class="tall-row">

      <ion-col class="tall-col">

        <ion-tabs #tabs>

          <ion-tab tab="factors">
            <ion-grid>
              <ion-row *ngFor="let factor of item.factors">
                <ion-col>
                  <ion-card>
                    <ion-card-content>{{ factor.desc }}</ion-card-content>
                  </ion-card>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-tab>

          <ion-tab tab="notes">
            <div class="blank-slate" *ngIf="!item.notes">
              No notes have been entered for this item.
            </div>

            <ion-row>
              <ion-col class="notes" [innerHTML]="notes"></ion-col>
            </ion-row>
          </ion-tab>

          <ion-tab-bar slot="bottom">

            <ion-tab-button tab="notes">
              <ion-label>Item Evaluation</ion-label>
              <ion-icon name="paper"></ion-icon>
            </ion-tab-button>

            <ion-tab-button tab="factors">
              <ion-label>Factors</ion-label>
              <ion-icon name="bookmark"></ion-icon>
            </ion-tab-button>

          </ion-tab-bar>
        </ion-tabs>

      </ion-col>

    </ion-row>
  </ion-content>
  `,
  styles: [`
    .asset-icon {
      margin-left: 10px;
    }

    .picture {
      text-align: center;
      height: 128px;
      width: 128px;
    }

    .profile-row {
      border-bottom: 1px solid #000;
    }

    .tall-row {
      height: calc(100% - 139px);
    }

    .tall-col {
      height: 100%;
    }

    ion-tab.ion-page {
      overflow: auto;
    }

    .notes {
      white-space: pre-wrap;
      color: #fff;
    }

    .middot-after:after {
      content: ' · ';
    }

    p {
      color: #fff;
    }
  `]
})
export class ItemModal implements OnInit {

  public item: Item;
  public type: string;
  public notes: string;

  public showShare: boolean;

  @ViewChild('tabs')
  public tabs: Tabs;

  constructor(private navParams: NavParams, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.showShare = !!(<any>navigator).share;
    this.item = this.navParams.get('item');
    this.type = this.navParams.get('type');

    this.tabs.select('notes');

    this.notes = markdown.toHTML((this.item.notes || '').trim());
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  share() {
    if(!(<any>navigator).share) {
      alert('You cannot share at this time, sorry.');
      return;
    }

    (<any>navigator).share({
      title: this.item.name,
      url: location.href
    });
  }
}
