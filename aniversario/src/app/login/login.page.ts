import { StorageService } from './../_service/storage.service';
import { FirebaseService } from './../_service/firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import $ from "jquery";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loading: any;

  email: any;
  password: any;
  data: any;
  nome: any;

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private afa: AngularFireAuth,
    public alertCtrl: AlertController,
    private router: Router,
    private firebase: FirebaseService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
  }

  async criarConta() {
    await this.presentLoading();

    const result = this.afa.createUserWithEmailAndPassword(this.email, this.password)
      .then(resp => {
        if (resp.additionalUserInfo.isNewUser) {
          this.loading.dismiss();
          this.storageService.salvarUid(resp.user.uid);
          this.perguntarData(resp.user);
        } else {
          this.loading.dismiss();
          this.storageService.salvarUid(resp.user.uid);
          this.router.navigate(['/']);
        }

      })
      .catch(error => {
        console.error(error);
        var mensagemToast = 'Erro ao realizar o cadastro. Favor tente novamente!';

        if (error.message == 'The password is invalid or the user does not have a password.') {
          mensagemToast = 'A senha é inválida. Favor tente novamente!';

        } else if (error.message == 'The email address is badly formatted.') {
          mensagemToast = 'O e-mail é inválido. Favor tente novamente!';

        } else if (error.message == 'Password should be at least 6 characters') {
          mensagemToast = 'A senha deve ter pelo menos 6 caracteres.';

        }

        this.presentToast(mensagemToast);
      })
  }

  async login() {
    await this.afa.signInWithEmailAndPassword(this.email, this.password)
      .then(resp => {
        this.storageService.salvarUid(resp.user.uid);
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.error(error);
        var mensagemToast = 'Erro ao realizar o login. Favor tente novamente!';

        if (error.message == 'The password is invalid or the user does not have a password.') {
          mensagemToast = 'A senha é inválida. Favor tente novamente!';

        } else if (error.message == 'There is no user record corresponding to this identifier. The user may have been deleted.') {
          mensagemToast = 'E-mail é inválida. Favor tente novamente!';

        }
        this.presentToast(mensagemToast);

      })
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Por favor, aguarde!',
    });
    return this.loading.present();
  }

  async presentToast(mensagemToast) {
    const toast = await this.toastCtrl.create({
      message: mensagemToast,
      duration: 5000
    });
    toast.present();
  }

  segmentChanged(event) {
    var local = event.detail.value;

    if (local == 'login') {
      $("#login").css('display', 'block');
      $("#registrar").css('display', 'none');
      $('.bgLogin').removeClass('sign-up-mode');

      setTimeout(() => {
        $('.titulo').removeClass('tituloRegister');
      }, 200);

      setTimeout(() => {
        $('.social-icon, .social-text, .social-media').removeClass('registerSocialIcon');
        $('ion-button').removeClass('botaoRegister');
      }, 1300);

    } else {
      $("#registrar").css('display', 'block');
      $("#login").css('display', 'none');
      $('.bgLogin').addClass('sign-up-mode');

      setTimeout(() => {
        $('.titulo').addClass('tituloRegister');
      }, 1400);

      setTimeout(() => {
        $('.social-icon, .social-text, .social-media').addClass('registerSocialIcon');
        $('ion-button').addClass('botaoRegister');
      }, 400);
    }



  }

  async perguntarData(user) {
    const alert = await this.alertCtrl.create({
      mode: 'ios',
      header: 'Está quase finalizando',
      message: 'Qual a sua data de nascimento?',
      inputs: [
        {
          name: 'data_nascimento',
          type: 'date'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Finalizar',
          handler: (data) => {
            console.log('data alert', data);
            this.salvarDados(data);
          }
        }
      ]
    })

    await alert.present();
  }

  salvarDados(data) {
    this.firebase.salvarDados(this.nome, data);
    this.router.navigate(['/']);
  }

}