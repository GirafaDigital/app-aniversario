import { StorageService } from './../_service/storage.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from './../_service/firebase.service';
import { Component, OnInit, NgModule } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';


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
    private afs: AngularFirestore,
  ) { }

  ngOnInit() {
    this.carregarAniversariantes();
  }

  carregarAniversariantes() {
    var valueUID = this.storageService.obterUid();

    this.afs.collection('users').doc(valueUID).collection('dados_usuario').valueChanges().subscribe(resp => {
      this.itens = resp;
    }, error => {
      this.firebase.errorFirebase(error);
      console.log(error);
    })

  }

  async addAniversariante() {
    const alert = await this.alertController.create({
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
          handler: (dados) => {
            console.log(dados);
            //debugger
            this.firebase.salvarNovoAniversariante(dados.nome, dados.data);
          }
        }
      ]
    });

    await alert.present();
  }

  async verAnivesariante(i) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.itens[i].nome,
      message: 'Escolha uma das alternativas.',
      mode: 'ios',
      buttons: [
        {
          text: 'Excluir',
          cssClass: 'excluir',
          handler: () => {
            var data: any;
            this.valueUID = this.storageService.obterUid();

            this.afs.collection('users').doc(this.valueUID).collection('dados_usuario').snapshotChanges().subscribe(resp => {

              data = resp.map(item => {
                return {
                  id: item.payload.doc.id,
                  ...item.payload.doc.data()
                } as unknown
              })

              this.confirmarExlcuir(data[i]);

            }, error => {
              this.firebase.errorFirebase(error);
              console.log(error);
            })

          }
        }, {
          text: 'Editar',
          handler: (dados) => {
            this.editarAniversariante(this.itens[i]);
          }
        }
      ]
    });

    await alert.present();
  }

  async editarAniversariante(dados) {
    const alert = await this.alertController.create({
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
            console.log(dados);
          }
        }
      ]
    });

    await alert.present();
  }

  async confirmarExlcuir(dados) {
    const alertExcluir = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Deseja realmente excluir?',
      message: 'Ao escolher essa alternativa não terá mais volta, o aniversariante será excluído permanentemente.',
      mode: 'ios',
      buttons: [
        {
          text: 'Sim!',
          handler: () => {
            debugger;
            this.afs.collection('users').doc(this.valueUID).collection('dados_usuario').doc(dados.id).delete().catch(error => console.log('error', error))

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

}
