import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  validForm: boolean = true;
  errorMessage: string = ''
  constructor(private createForm: FormBuilder, private afAuth: AngularFireAuth){ }

  ngOnInit(): void {
    this.formLogin = this.createForm.group({
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      password: ['', Validators.required]
    });
  }

  login()
  {
    if (this.formLogin.valid){
      this.validForm= true;
      this.afAuth.auth.signInWithEmailAndPassword(this.formLogin.value.email, this.formLogin.value.password)
      .then((user)=>{
        console.log(user)
      }).catch((error)=>{
        this.validForm = false;
        this.errorMessage = error.message;
      })
    } else {
      this.validForm= false;
      this.errorMessage = 'Verify if the data is correct';
    }
  }

}
