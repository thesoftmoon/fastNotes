import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoteDetailsPageRoutingModule } from './note-details-routing.module';

import { NoteDetailsPage } from './note-details.page';
import { NavHeaderComponent } from 'src/app/components/nav-header/nav-header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoteDetailsPageRoutingModule,
  ],
  declarations: [NoteDetailsPage, NavHeaderComponent]
})
export class NoteDetailsPageModule {}
