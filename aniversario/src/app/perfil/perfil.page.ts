import { AngularFirestore } from '@angular/fire/firestore';
import { StorageService } from './../_service/storage.service';
import { FirebaseService } from './../_service/firebase.service';
import { Component, OnInit } from '@angular/core';
import { Dados } from '../_interface/dados';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  dados: any;
  nome: {};
  data: {};

  valueUID: any;

  constructor(
    private firebaseService: FirebaseService,
    private storageService: StorageService,
    private afs: AngularFirestore,
  ) {
    this.valueUID = this.storageService.obterUid();
    this.perfil();
  }

  ngOnInit() {
  }

  perfil() {

    this.afs.collection('users').doc(this.valueUID).collection('dados_usuario').snapshotChanges().subscribe(resp => {

      this.dados = resp.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as unknown as Dados
      })

      this.dados.forEach(dados => {
        if (dados.uid == this.valueUID) {
          this.nome = dados.nome,
            this.data = dados.data
        }
      });

    }, error => {
      this.firebaseService.errorFirebase(error);
      console.log(error);
    })
  }

  logout() {
    this.firebaseService.logout();
  }

  salvarAlteracao() {
    this.afs.collection('users').doc(this.valueUID).collection('dados_usuario').snapshotChanges().subscribe(resp => {

      this.dados = resp.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as unknown as Dados
      })

      this.dados.forEach(dados => {
        if (dados.uid == this.valueUID) {
          this.afs.collection('users').doc(this.valueUID).collection('dados_usuario').doc(this.dados[0].id).update({
            nome: this.nome,
            data: this.data
          }).catch(error => console.log('error', error));
        }
      })
    })

  }

}
