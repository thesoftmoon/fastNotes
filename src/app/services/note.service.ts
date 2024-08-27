import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export interface Note {
  id: number;
  title: string;
  content: string;
  //If the image exist?
  image?: string;
}

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private notes: Note[] = [];
  private nextId = 1;

  constructor() {}

  getNotes(): Note[] {
    return this.notes;
  }

  getNoteById(id: number): Note | undefined {
    return this.notes.find((note) => note.id === id);
  }

  addNote(note: Note) {
    note.id = this.nextId++;
    console.log(`adding a note with the id: ${note.id}`);
    this.notes.push(note);
  }

  updateNote(note: Note) {
    const index = this.notes.findIndex((n) => n.id === note.id);
    if (index !== -1) {
      this.notes[index] = note;
    }
  }

  deleteNote(id: number) {
    console.log(id)
    this.notes = this.notes.filter((note) => note.id !== id);
    console.log(this.notes);
  }
}
