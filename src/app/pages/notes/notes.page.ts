import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage {
  notes: any[] = [];

  constructor(private router: Router, private storageService: StorageService) {}

  ionViewWillEnter() {
    this.getAllNotes();
  }

  addNote() {
    console.log('add note');
    this.router.navigateByUrl('/note-details');
  }

  viewNote(noteId: number) {
    console.log(noteId);
    this.router.navigateByUrl(`/note-details/${noteId}`);
  }

  deleteNote(noteId: number) {
    this.storageService.remove(noteId.toString());
    console.log(`Deleted the note with id: ${noteId}`);
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
