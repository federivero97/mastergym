import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {
  clients: any[] = new Array<any[]>();

  constructor(private db: AngularFirestore) {}

  ngOnInit(): void {
    this.clients.length = 0;
    this.db.collection('clients').get().subscribe((items)=>{
      
      items.docs.forEach((item)=>{
        let client = item.data();
        client.id = item.id;
        client.ref = item.ref;
        this.clients.push(client);
      })
      
    });
  }

}
