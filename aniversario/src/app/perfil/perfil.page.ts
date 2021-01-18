import { AngularFirestore } from '@angular/fire/firestore';
import { StorageService } from './../_service/storage.service';
import { FirebaseService } from './../_service/firebase.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  dados: any;
  nome: {};
  data: {};

  constructor(
    private firebaseService: FirebaseService,
    private storageService: StorageService,
    private afs: AngularFirestore,
  ) {
    this.perfil();
  }

  ngOnInit() {
  }

  perfil() {
    var valueUID = this.storageService.obterUid();

    this.afs.collection('users').doc(valueUID).collection('dados_usuario').snapshotChanges().subscribe(resp => {

      this.dados = resp.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as unknown
      })
      
      this.dados.forEach(dados => {
        if (dados.uid == valueUID) {
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

}
