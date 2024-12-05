import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-story-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ isEdit ? 'Edit' : 'Tambah' }} Story</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">Batal</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-label position="floating">Judul Story</ion-label>
        <ion-input [(ngModel)]="storyTitle"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Deskripsi Story</ion-label>
        <ion-input [(ngModel)]="storyDescription"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Pilih Toy</ion-label>
        <ion-select [(ngModel)]="selectedToyId">
          <ion-select-option 
            *ngFor="let toy of toys" 
            [value]="toy.toy_id">
            {{ toy.toy_name }}
          </ion-select-option>
        </ion-select>
      </ion-item>
      <ion-button 
        expand="block" 
        class="ion-margin-top" 
        (click)="saveOrUpdateStory()">
        {{ isEdit ? 'Update' : 'Simpan' }}
      </ion-button>
    </ion-content>
  `
})
export class StoryModalComponent implements OnInit {
  storyTitle: string = '';
  storyDescription: string = '';
  selectedToyId: number | null = null;
  storyId: number | null = null;
  toys: any[] = [];
  isEdit: boolean = false;

  constructor(
    private modalController: ModalController,
    private apiService: ApiService,
    private toastController: ToastController,
    private navParams: NavParams
  ) {}

  ngOnInit() {
    const story = this.navParams.get('story');
    this.toys = this.navParams.get('toys') || [];

    if (story) {
      this.isEdit = true;
      this.storyId = story.story_id;
      this.storyTitle = story.story_title;
      this.storyDescription = story.story_description;
      this.selectedToyId = story.toy_id;
    }
  }

  async saveOrUpdateStory() {
    if (!this.storyTitle || !this.storyDescription || !this.selectedToyId) {
      await this.presentToast('Mohon isi semua field', 'warning');
      return;
    }

    const storyData = {
      story_title: this.storyTitle,
      story_description: this.storyDescription,
      toy_id: this.selectedToyId
    };

    const saveMethod = this.isEdit 
      ? this.apiService.updateToyStory({...storyData, story_id: this.storyId}) 
      : this.apiService.createToyStory(storyData);

    saveMethod.subscribe({
      next: async (res) => {
        await this.presentToast(this.isEdit ? 'Story berhasil diupdate' : 'Story berhasil ditambah');
        this.modalController.dismiss(true);
      },
      error: async (err) => {
        await this.presentToast('Gagal menyimpan story', 'danger');
      }
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async presentToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: color
    });
    toast.present();
  }
}