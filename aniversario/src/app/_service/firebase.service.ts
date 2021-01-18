import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private afs: AngularFirestore
  ) { }

  salvarDados(user, nome, data) {

    const dataAtual = new Date();
    const dataAtualNum = String(dataAtual.getTime());
    

    debugger

    this.afs.collection('users').doc('Dnv6nyc6f8dXV6KVWwT3yPlgImj1').collection('dados_usuario').doc(dataAtualNum).set({
      nome: nome,
      data_aniversario: data
    })
    .then(resp => console.log(resp))
    .catch(error => console.log('error', error))

  }
}
