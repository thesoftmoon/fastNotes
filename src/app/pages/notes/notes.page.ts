import { Component, OnInit } from '@angular/core';
import { NoteService, Note } from 'src/app/services/note.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage {
  notes: any[] = [];

  constructor(
    private noteService: NoteService,
    private router: Router,
    private storageService: StorageService
  ) {}

  ionViewWillEnter() {
    this.storageService.getAll().then((notes) => {
      notes.forEach((element) => {
        const exists = this.notes.find((note) => note.id === element.value.id);
        if (!exists) {
          this.notes.push(element.value);
        }
      });
      console.log(this.notes);
    });
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
    //this.noteService.deleteNote(noteId);
    //this.notes = this.noteService.getNotes();

    this.storageService.remove(noteId.toString());

    this.getAllNotes();
  }

  getAllNotes() {
    this.notes = [];
    this.storageService.getAll().then((notes) => {
      notes.forEach((element) => {
        const exists = this.notes.find((note) => note.id === element.value.id);
        if (!exists) {
          this.notes.push(element.value);
        }
      });
      console.log(this.notes);
    });
  }

  descriptionTrim(description: string) {
    return description.length > 20
      ? description.slice(0, 20).concat('...')
      : description;
  }
}
