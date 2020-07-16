import { Component, OnInit, Input, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Client } from '../models/client';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-client',
  templateUrl: './select-client.component.html',
  styleUrls: ['./select-client.component.scss']
})
export class SelectClientComponent implements OnInit {
  clients: Client[] = new Array<Client>()
  @Input('clientSelected') clientSelected: string
  @Output('selectedClient') selectedClient = new EventEmitter()
  @Output('canceledClient') canceledClient = new EventEmitter()
  
  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    // Get clients from the database
    this.db.collection('clients').get().subscribe((items)=>{
      this.clients.length = 0
      items.docs.forEach((item)=>{
        let client: any = item.data();
        client.id = item.id;
        client.ref = item.ref;
        this.clients.push(client);
      })
      
    })
  }

  // Filter client by name
  searchClient(name: string){
    this.clients.forEach((client)=>{
      if(client.name.toLowerCase().includes(name.toLowerCase())){
        client.visible = true
      } else {
        client.visible = false
      }
      if (name == ''){
        client.visible = false
      }
    })
  }

  // Throw the selected client to parent
  selectClient(client: Client){
    this.clientSelected = client.name + client.lastName
    this.clients.forEach((client)=>{
      client.visible = false
    })
    this.selectedClient.emit(client)
  }

  // Delete the selected client to parent
  cancelSelectClient(){
    this.clientSelected = undefined
    this.canceledClient.emit()
  }
}
