import { StorageService } from './../_service/storage.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from './../_service/firebase.service';
import { Component, OnInit, NgModule } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  // itens = [
  //   {
  //     nome: 'Joey Tribbiani',
  //     data: '10/03/1987'
  //   }, {
  //     nome: 'Chandler Bing',
  //     data: '05/07/1966'
  //   }, {
  //     nome: 'Ross Geller',
  //     data: '12/02/1980'
  //   }, {
  //     nome: 'Rachel Green',
  //     data: '28/10/1974'
  //   }, {
  //     nome: 'Phoebe Buffay',
  //     data: '30/11/1979'
  //   }, {
  //     nome: 'Monica Geller',
  //     data: '24/07/1983'
  //   }, {
  //     nome: 'Joey Tribbiani',
  //     data: '10/03/1987'
  //   }, {
  //     nome: 'Chandler Bing',
  //     data: '05/07/1966'
  //   }, {
  //     nome: 'Ross Geller',
  //     data: '12/02/1980'
  //   }, {
  //     nome: 'Rachel Green',
  //     data: '28/10/1974'
  //   }, {
  //     nome: 'Phoebe Buffay',
  //     data: '30/11/1979'
  //   }, {
  //     nome: 'Monica Geller',
  //     data: '24/07/1983'
  //   }
  // ];
  valueUID: any;
  itens: any;

  constructor(
    public modalController: ModalController,
    public alertController: AlertController,
    private firebase: FirebaseService,
    private storageService: StorageService,
    private toastCtrl: ToastController,
    private afs: AngularFirestore,
  ) { }

  ngOnInit() {
    this.valueUID = this.storageService.obterUid();
    this.carregarAniversariantes();

  }

  carregarAniversariantes() {
    this.afs.collection('users').doc(this.valueUID).collection('dados_usuario').valueChanges().subscribe(resp => {
      this.itens = resp;
    }, error => {
      this.firebase.errorFirebase(error);
      console.log(error);
    })

  }

  async addAniversariante() {
    const alertAdd = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Novo aniversariante',
      mode: 'ios',
      inputs: [
        {
          name: 'nome',
          type: 'text',
          placeholder: 'Nome',
        },
        {
          name: 'data',
          type: 'date',
          placeholder: 'Data de nascimento'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (adicionar) => {
            console.log(adicionar);
            this.firebase.salvarNovoAniversariante(adicionar.nome, adicionar.data);
          }
        }
      ]
    });

    await alertAdd.present();
  }

  async verAnivesariante(i) {
    const alertVer = await this.alertController.create({
      header: this.itens[i].nome,
      message: 'Escolha uma das alternativas.',
      mode: 'ios',
      buttons: [
        {
          text: 'Excluir',
          cssClass: 'excluir',
          handler: (excluir) => {
            var dadosAniver: any;

            this.afs.collection('users').doc(this.valueUID).collection('dados_usuario').snapshotChanges().subscribe(resp => {


              dadosAniver = resp.map(item => {
                return {
                  id: item.payload.doc.id,
                  ...item.payload.doc.data()
                } as unknown
              })

              if (!dadosAniver[i].uid) {
                this.confirmarExlcuir(dadosAniver[i]);
              } else {
                var mensagem = 'Seu aniversário não pode ser removido, somente editado.';
                this.presentToast(mensagem)
              }


            }, error => {
              this.firebase.errorFirebase(error);
              console.log(error);
            })



          }
        }, {
          text: 'Editar',
          handler: (editar) => {
            this.editarAniversariante(this.itens[i], i);
          }
        }
      ]
    });

    await alertVer.present();
  }

  async editarAniversariante(dados, i) {
    const alertEdit = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Editar aniversariante',
      mode: 'ios',
      inputs: [
        {
          name: 'nome',
          type: 'text',
          value: dados.nome,
          placeholder: 'Nome',
        },
        {
          name: 'data',
          type: 'date',
          value: dados.data,
          placeholder: 'Data de nascimento'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Salvar',
          handler: (dados) => {

            this.afs.collection('users').doc(this.valueUID).collection('dados_usuario').snapshotChanges().subscribe(resp => {

              const data = resp.map(item => {
                return {
                  id: item.payload.doc.id,
                  ...item.payload.doc.data()
                } as unknown
              })

              this.afs.collection('users').doc(this.valueUID).collection('dados_usuario').doc(data[i].id).update({
                nome: dados.nome,
                data: dados.data
              }).catch(error => console.log('error', error))

            }, error => {
              this.firebase.errorFirebase(error);
              console.log(error);
            })
          }
        }
      ]
    });

    await alertEdit.present();
  }

  async confirmarExlcuir(dados) {
    const alertExcluir = await this.alertController.create({
      header: 'Deseja realmente excluir?',
      message: 'Ao escolher essa alternativa não terá mais volta, o aniversariante será excluído permanentemente.',
      mode: 'ios',
      buttons: [
        {
          text: 'Sim!',
          handler: () => {
            this.afs.collection('users').doc(this.valueUID).collection('dados_usuario').doc(dados.id).delete().catch(error => console.log('error', error));
          }
        }, {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }
      ]
    });

    await alertExcluir.present();
  }

  async presentToast(mensagemToast) {
    const toast = await this.toastCtrl.create({
      message: mensagemToast,
      duration: 1500
    });
    toast.present();
  }

}
