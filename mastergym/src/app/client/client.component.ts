import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { MessagesService } from '../services/messages.service';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  
  formClient: FormGroup;
  imgURL = 'https://firebasestorage.googleapis.com/v0/b/mastergym-a3bfc.appspot.com/o/clients%2Fundefined.png?alt=media&token=e50d3e87-2377-4e3c-a396-5f2e8c0279b9';
  editeable: boolean = false;
  id: string;

  constructor(
    private fb: FormBuilder,
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private activeRoute: ActivatedRoute,
    private msg: MessagesService,
  ){}

  ngOnInit(): void {


    this.formClient = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      birthdate: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      phone: ['', Validators.required],
      imgURL: [''],
    })

    this.id = this.activeRoute.snapshot.params.clientId

    if (this.id != undefined){
      this.db.doc<any>('clients/' + this.id).valueChanges().subscribe((client)=>{
        this.formClient.setValue({
          name: client.name,
          lastName: client.lastName,
          birthdate: new Date(client.birthdate.seconds * 1000).toISOString().substr(0,10),
          email: client.email,
          phone: client.phone,
          imgURL: null,
        })
        this.imgURL = client.imgURL
      });
      this.editeable = true;
    }
  };

  addClient(){

    this.formClient.value.birthdate = new Date(this.formClient.value.birthdate)
    this.formClient.value.imgURL = this.imgURL
    this.db.collection('clients').add(this.formClient.value).then((end)=>{
      console.log('The client has been added succesfully')
      this.msg.messageSuccess('Good Job','The client has been added successfully')
    }).catch(()=>{
      console.log('Error')
      this.msg.messageError('Error',"Could not add the client")
    })
  }
  
  editClient(){

    this.formClient.value.birthdate = new Date(this.formClient.value.birthdate)
    this.formClient.value.imgURL = this.imgURL

    this.db.doc('clients/' + this.id).update(this.formClient.value).then((end)=>{
      console.log('The client has been edited succesfull')
      this.msg.messageSuccess('Good Job','The client has been edited successfully')
    }).catch(()=>{
      console.log('Error')
      this.msg.messageError('Error',"Could not edit the client")
    })
  }

  uploadClientImg(event){

    if(event.target.files.length > 0){
      const file = event.target.files[0];
      let name = new Date().getTime().toString()
      let ext = file.name.toString().substring(file.name.toString().lastIndexOf('.'))
      const filePath = 'clients/' + name + ext;
      const ref = this.storage.ref(filePath);
      const task = ref.put(file).then((end)=>{
        ref.getDownloadURL().subscribe((url)=>{
          this.imgURL = url;
          console.log(url);
        })
      });
    }
  }

}
