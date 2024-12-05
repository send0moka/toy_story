import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { ToyModalComponent } from './toy-modal.component';
import { StoryModalComponent } from './story-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  username: string = '';
  userId: number = 0;
  toys: any[] = [];
  stories: any[] = [];
  selectedSegment: string = 'toys';

  constructor(
    private router: Router,
    private api: ApiService,
    private modalController: ModalController,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadUserData();
    this.loadToys();
    this.loadStories();
  }

  loadUserData() {
    const userString = localStorage.getItem('user');
    if (userString) {
      const userData = JSON.parse(userString);
      this.username = userData.username;
      this.userId = userData.user_id;
    }
  }

  loadToys() {
    this.api.getToys().subscribe({
      next: (res) => {
        // Directly assign the response, remove .data
        this.toys = res || [];
        console.log('Toys loaded:', this.toys); // Add logging
      },
      error: (err) => {
        console.error('Error loading toys:', err); // More detailed error logging
        this.presentToast('Gagal memuat toys', 'danger');
      }
    });
  }
  
  loadStories() {
    this.api.getToyStories().subscribe({
      next: (res) => {
        // Directly assign the response, remove .data
        this.stories = res || [];
        console.log('Stories loaded:', this.stories); // Add logging
      },
      error: (err) => {
        console.error('Error loading stories:', err); // More detailed error logging
        this.presentToast('Gagal memuat stories', 'danger');
      }
    });
  }

  async openToyModal(toy?: any) {
    const modal = await this.modalController.create({
      component: ToyModalComponent,
      componentProps: {
        toy: toy,
        userId: this.userId
      }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.loadToys();
      }
    });

    return await modal.present();
  }

  async openStoryModal(story?: any) {
    const modal = await this.modalController.create({
      component: StoryModalComponent,
      componentProps: {
        story: story,
        toys: this.toys
      }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.loadStories();
      }
    });

    return await modal.present();
  }

  async deleteToy(toyId: number) {
    const alert = await this.alertController.create({
      header: 'Konfirmasi Hapus',
      message: 'Anda yakin ingin menghapus toy ini?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Hapus',
          handler: () => {
            this.api.deleteToy(toyId).subscribe({
              next: () => {
                this.presentToast('Toy berhasil dihapus');
                this.loadToys();
              },
              error: () => {
                this.presentToast('Gagal menghapus toy', 'danger');
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteStory(storyId: number) {
    const alert = await this.alertController.create({
      header: 'Konfirmasi Hapus',
      message: 'Anda yakin ingin menghapus story ini?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Hapus',
          handler: () => {
            // Tambahkan method deleteStory di ApiService jika belum ada
            this.api.deleteToyStory(storyId).subscribe({
              next: () => {
                this.presentToast('Story berhasil dihapus');
                this.loadStories();
              },
              error: () => {
                this.presentToast('Gagal menghapus story', 'danger');
              }
            });
          }
        }
      ]
    });

    await alert.present();
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

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}