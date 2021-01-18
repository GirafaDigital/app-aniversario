import { AngularFireAuth } from '@angular/fire/auth';
import { StorageService } from './storage.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  valueUID: string;

  constructor(
    private afs: AngularFirestore,
    private storageService: StorageService,
    private afa: AngularFireAuth,
    private toastCtrl: ToastController
  ) { }

  getAuth() {
    return this.afa.idToken;
  }

  salvarDados(nome, data) {
    const dataAtual = new Date();
    const dataAtualNum = String(dataAtual.getTime());
    this.valueUID = this.storageService.obterUid();

    this.afs.collection('users').doc(this.valueUID).collection('dados_usuario').doc(dataAtualNum).set({
      nome: nome,
      data_aniversario: data
    })
      .then(resp => console.log(resp))
      .catch(error => console.log('error', error))

  }


  listaAniversario() {
    this.afs.collection('users').doc(this.valueUID).collection('dados_usuario').valueChanges().subscribe(resp => {
      return resp
    }, error => {
      return error
    });

    //   nome: nome,
    //   data_aniversario: data

  }

  async logout() {
    this.afa.signOut()
      .then(() => { console.log("LOG Out"); })
      .catch((error) => { console.log(error); });
  }

  async presentToast(mensagemToast) {
    const toast = await this.toastCtrl.create({
      message: mensagemToast,
      duration: 5000
    });
    toast.present();
  }
}
