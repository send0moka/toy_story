import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private router: Router,
    private api: ApiService,
    private toastController: ToastController
  ) { }

  async presentToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: color
    });
    toast.present();
  }

  register() {
    if (!this.username || !this.password || !this.confirmPassword) {
      this.presentToast('Mohon isi semua field', 'warning');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.presentToast('Password tidak cocok', 'danger');
      return;
    }

    const data = {
      username: this.username,
      password: this.password
    };

    this.api.register(data).subscribe({
      next: async (res: any) => {
        if (res.status) {
          this.router.navigate(['/auth/login']);
          await this.presentToast('Registrasi berhasil', 'success');
        } else {
          await this.presentToast(res.message, 'danger');
        }
      },
      error: async (err: any) => {
        console.error('Registrasi error:', err);
        await this.presentToast('Terjadi kesalahan', 'danger');
      }
    });
  }
}