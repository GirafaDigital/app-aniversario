import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './../_service/auth.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import $ from "jquery";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loading: any;

  email: any;
  password: any;

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private afa: AngularFireAuth
  ) { }

  ngOnInit() {
  }

  async criarConta() {
    await this.presentLoading();

    const result = this.afa.createUserWithEmailAndPassword(this.email, this.password)
      .then(resp => {
        this.loading.dismiss();
        console.log('resp', resp)

      })
      .catch(error => {
        console.error(error);
        var mensagemToast = 'Erro ao realizar o cadastro. Favor tente novamente!';

        if (error.message == 'The password is invalid or the user does not have a password.') {
          mensagemToast = 'A senha é inválida. Favor tente novamente!';

        } else if (error.message == 'There is no user record corresponding to this identifier. The user may have been deleted.') {
          mensagemToast = 'E-mail é inválida. Favor tente novamente!';

        }
        this.presentToast(mensagemToast);
      })
  }

  async login() {
    await this.afa.signInWithEmailAndPassword(this.email, this.password)
      .then(resp => {
        console.log(resp)
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
    this.loading.dismiss()
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

}
