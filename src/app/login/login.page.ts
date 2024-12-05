import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

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

  login() {
    if (this.username && this.password) {
      const data = {
        username: this.username,
        password: this.password
      };

      this.api.login(data).subscribe({
        next: async (res: any) => {
          if (res.status) {
            localStorage.setItem('user', JSON.stringify(res.data));
            this.router.navigate(['/home']);
            await this.presentToast('Login berhasil');
          } else {
            await this.presentToast(res.message, 'danger');
          }
        },
        error: async (err: any) => {
          console.error('Login error:', err);
          await this.presentToast('Terjadi kesalahan', 'danger');
        }
      });
    } else {
      this.presentToast('Mohon isi semua field', 'warning');
    }
  }
}