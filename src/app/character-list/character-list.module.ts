import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { FilterPipeModule } from 'ngx-filter-pipe';

import { CharacterListPage } from './character-list.page';
import { CharacterSortPopover } from './character-list.ui';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterPipeModule,
    RouterModule.forChild([
      {
        path: '',
        component: CharacterListPage
      }
    ])
  ],
  entryComponents: [CharacterSortPopover],
  declarations: [CharacterListPage, CharacterSortPopover]
})
export class CharacterListPageModule {}
