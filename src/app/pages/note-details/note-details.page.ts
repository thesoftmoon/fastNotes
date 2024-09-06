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
export class NoteDetailsPage implements OnInit {

  note: Note = { id: 0, title: '', content: '' };

  constructor(private route: ActivatedRoute, private router: Router, private noteService: NoteService, private storageService: StorageService) { }

  ngOnInit() {
    const noteId = this.route.snapshot.paramMap.get('id');
    console.log(noteId)
    if (noteId) {
      const existingNote = this.noteService.getNoteById(+noteId);
      if (existingNote) {
        this.note = { ...existingNote };
      }
    }
  }

  async getNote(id: string){
    let note = await this.storageService.get(id);
    console.log(note);
  }

  saveNote() {
    if (this.note.id) {
      this.noteService.updateNote(this.note);
    } else {

      this.noteService.addNote(this.note);
      this.note.id = new Date().getTime()
      console.log(this.note.id);
      this.storageService.set(this.note.id.toString(), this.note)

      this.getNote(this.note.id.toString());
    }
    this.router.navigateByUrl('/notes');
  }

  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64
    });

    if (image) {
      this.note.image = `data:image/jpeg;base64,${image.base64String}`;
    }
  }
}
