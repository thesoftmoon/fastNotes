import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {
  notes: {
    text: String;
    image: String;
  }[] = [];

  constructor(private noteService: NoteService) {}

  ngOnInit() {
    console.log('loaded');
  }

  async addNote() {
    const newNoteText = 'new text';
    const image = await this.noteService.takePhoto();

    this.notes.push({
      text: newNoteText,
      image: image,
    });
  }
}
