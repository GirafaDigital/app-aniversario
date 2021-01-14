import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  nome: {};
  data: {};

  constructor() { }

  ngOnInit() {
  }

  perfil() {
    console.log('estou aqui');
  }

}
