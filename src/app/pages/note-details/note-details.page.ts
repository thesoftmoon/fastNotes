import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { StorageService } from 'src/app/services/storage.service';
import { AnimationOptions } from '@angular/animations';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.page.html',
  styleUrls: ['./note-details.page.scss'],
})
export class NoteDetailsPage {
  note: any = {};
  noteId: string | null = null;
  scrollValue: number = 0;
  isModalOpen: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService
  ) {}

  ionViewWillEnter() {
    this.noteId = this.route.snapshot.paramMap.get('id');
    if (this.noteId) {
      console.log(`este es el id: ${this.noteId}`);
      this.getNote(this.noteId);
      console.log('charged');
    }
  }

  async getNote(id: string) {
    let noteDetail = await this.storageService.get(id);
    console.log(noteDetail);

    this.note = noteDetail;
  }

  saveNote() {
    if (this.noteId) {
      console.log('saving');
      this.storageService.set(this.noteId.toString(), this.note);
      this.router.navigateByUrl('/notes');
    } else {
      this.note.id = new Date().getTime();
      this.storageService.set(this.note.id.toString(), this.note);
      this.router.navigateByUrl('/notes');
    }
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

  onScroll(event: any) {
    const scrollTop = event.detail.scrollTop;
    this.scrollValue = scrollTop;

    console.log('scrolleaste' + scrollTop);
  }

  showImage(isOpen: boolean) {
    if (this.isModalOpen) {
      this.isModalOpen = false;
    } else {
      this.isModalOpen = isOpen;
    }
    console.log(this.isModalOpen);
  }
}
