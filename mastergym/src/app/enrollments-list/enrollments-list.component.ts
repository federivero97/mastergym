import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Enrollment } from '../models/enrollment';

@Component({
  selector: 'app-enrollments-list',
  templateUrl: './enrollments-list.component.html',
  styleUrls: ['./enrollments-list.component.scss']
})
export class EnrollmentsListComponent implements OnInit {
  enrollments: any[] = [];

  constructor(private db:AngularFirestore) { }

  ngOnInit(): void {
    this.db.collection('enrollments').get().subscribe((items)=>{
      items.forEach((item) =>{

        let enrollment = item.data();
        enrollment.id = item.id;

        this.db.doc(item.data().client.path).get().subscribe((client)=>{
          enrollment.client = client.data();
        })

        this.db.doc(item.data().plan.path).get().subscribe((plan)=>{
          enrollment.plan = plan.data();
        })

        enrollment.initialDate = new Date(enrollment.initialDate.seconds * 1000);
        enrollment.endDate = new Date(enrollment.endDate.seconds *1000);

        this.enrollments.push(enrollment);
        console.log(enrollment)
      })
    })
  }

}
