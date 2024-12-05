import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-toy-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ isEdit ? 'Edit' : 'Tambah' }} Toy</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">Batal</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-label position="floating">Nama Toy</ion-label>
        <ion-input [(ngModel)]="toyName"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Deskripsi</ion-label>
        <ion-input [(ngModel)]="toyDescription"></ion-input>
      </ion-item>
      <ion-button 
        expand="block" 
        class="ion-margin-top" 
        (click)="saveOrUpdateToy()">
        {{ isEdit ? 'Update' : 'Simpan' }}
      </ion-button>
    </ion-content>
  `
})
export class ToyModalComponent implements OnInit {
  toyName: string = '';
  toyDescription: string = '';
  userId: number = 0;
  toyId: number | null = null;
  isEdit: boolean = false;

  constructor(
    private modalController: ModalController,
    private apiService: ApiService,
    private toastController: ToastController,
    private navParams: NavParams
  ) {}

  ngOnInit() {
    const toy = this.navParams.get('toy');
    this.userId = this.navParams.get('userId');

    if (toy) {
      this.isEdit = true;
      this.toyId = toy.toy_id;
      this.toyName = toy.toy_name;
      this.toyDescription = toy.toy_description;
    }
  }

  async saveOrUpdateToy() {
    if (!this.toyName || !this.toyDescription) {
      await this.presentToast('Mohon isi semua field', 'warning');
      return;
    }

    const toyData = {
      toy_name: this.toyName,
      description: this.toyDescription,
      user_id: this.userId
    };

    const saveMethod = this.isEdit 
      ? this.apiService.updateToy({...toyData, toy_id: this.toyId}) 
      : this.apiService.createToy(toyData);

    saveMethod.subscribe({
      next: async (res) => {
        await this.presentToast(this.isEdit ? 'Toy berhasil diupdate' : 'Toy berhasil ditambah');
        this.modalController.dismiss(true);
      },
      error: async (err) => {
        await this.presentToast('Gagal menyimpan toy', 'danger');
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