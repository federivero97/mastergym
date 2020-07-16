import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Client } from '../models/client';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {
  clients: Client[] = new Array<Client>()

  constructor(private db: AngularFirestore) {}

  ngOnInit(): void {
    this.db.collection('clients').get().subscribe((items)=>{
      this.clients.length = 0
      items.docs.forEach((item)=>{
        let client: any = item.data() as Client;
        client.id = item.id;
        client.ref = item.ref;
        client.visible = true;
        this.clients.push(client);
      })
      
    })
  }

  searchClient(text: string){
    this.clients.forEach((client)=>{
      if(client.name.toLowerCase().includes(text.toLowerCase())){
        client.visible = true;
      } else {
        client.visible = false;
      }
      if (text == ''){
        client.visible = true;
      }
    });
  }

}
