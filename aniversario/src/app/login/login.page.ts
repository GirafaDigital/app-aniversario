import { FirebaseAuthentication } from '@ionic-native/firebase-authentication';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: any;
  password: any;
  action = 'Ok';

  constructor(
    private firebaseAuth: FirebaseAuthentication
  ) { }

  ngOnInit() {
  }

  async loginEmailSenha() {
    // const result = await this.firebaseAuth.createUserWithEmailAndPassword("my@mail.com", "pa55w0rd")
    //   .then((res: any) => console.log(res))
    //   .catch((error: any) => console.error(error));

  //  console.log(result)



  }

}
