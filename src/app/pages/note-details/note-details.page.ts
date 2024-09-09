import { Component, OnInit } from '@angular/core';
import { NoteService, Note } from 'src/app/services/note.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.page.html',
  styleUrls: ['./note-details.page.scss'],
})
export class NoteDetailsPage {
  note: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NoteService,
    private storageService: StorageService
  ) {}

  ionViewWillEnter() {
    const noteId = this.route.snapshot.paramMap.get('id');
    if (noteId) {
      console.log(`este es el id: ${noteId}`);
      this.getNote(noteId);
      console.log('charged');
    }
  }

  async getNote(id: string) {
    let noteDetail = await this.storageService.get(id);
    console.log(noteDetail);

    this.note = noteDetail;
  }

  saveNote() {
    if (this.note.id) {
      this.noteService.updateNote(this.note);
    } else {
      this.noteService.addNote(this.note);
      this.note.id = new Date().getTime();
      console.log(this.note.id);
      this.storageService.set(this.note.id.toString(), this.note);
      this.getNote(this.note.id.toString());
    }
    this.router.navigateByUrl('/notes');
  }

  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
    });

    if (image) {
      this.note.image = `data:image/jpeg;base64,${image.base64String}`;
    }
  }
}
