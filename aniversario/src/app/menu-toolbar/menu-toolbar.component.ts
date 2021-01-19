import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-toolbar',
  templateUrl: './menu-toolbar.component.html',
  styleUrls: ['./menu-toolbar.component.scss'],
})
export class MenuToolbarComponent implements OnInit {

  @Input() titulo;
  @Input() desabilitarVoltar;

  constructor(
    private router: Router
  ) { }

  ngOnInit() { 
    console.log(this.desabilitarVoltar)
  }

  irPerfil() {
    this.router.navigate(['/perfil'])
  }


}
