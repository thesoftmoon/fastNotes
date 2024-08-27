import { Component, OnInit } from '@angular/core';
import { NoteService, Note } from 'src/app/services/note.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage {
  notes: Note[] = [];

  constructor(private noteService: NoteService, private router: Router) {}

  ionViewWillEnter() {
    this.notes = this.noteService.getNotes();
  }

  addNote() {
    console.log('add note');
    this.router.navigateByUrl('/note-details');
  }

  viewNote(noteId: number) {
    console.log('view note');
    this.router.navigateByUrl(`/note-details/${noteId}`);
  }

  deleteNote(noteId: number) {
    console.log('delete');
    this.noteService.deleteNote(noteId);
    this.notes = this.noteService.getNotes();
  }
}
