import { Component, OnInit } from '@angular/core';
import { NoteService, Note } from 'src/app/services/note.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.page.html',
  styleUrls: ['./note-details.page.scss'],
})
export class NoteDetailsPage implements OnInit {

  note: Note = { id: 0, title: '', content: '' };

  constructor(private route: ActivatedRoute, private router: Router, private noteService: NoteService) { }

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

  saveNote() {
    if (this.note.id) {
      this.noteService.updateNote(this.note);
    } else {
      this.noteService.addNote(this.note);
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
