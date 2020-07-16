import { Component, OnInit } from '@angular/core';
import { Enrollment } from '../models/enrollment';
import { Client } from '../models/client';
import { AngularFirestore } from '@angular/fire/firestore';
import { Plan } from '../models/plan';
import { MessagesService } from '../services/messages.service';


@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.scss']
})
export class EnrollmentComponent implements OnInit {
  
  clientSelected: Client = new Client();
  enrollment: Enrollment = new Enrollment();
  idPlan: string = null;
  planSelected: Plan = new Plan();
  plans: Plan[] = new Array<Plan>();

  constructor(private db:AngularFirestore, private msg:MessagesService) { }

  ngOnInit(): void {
    // Get plans from database
    this.db.collection('plans').get().subscribe((items)=>{
      this.plans.length = 0
      items.docs.forEach((item)=>{
        let plan: any = item.data() as Plan;
        plan.id = item.id;
        plan.ref = item.ref;
        this.plans.push(plan);
      })
    });
  }

  // Define enrollment client
  defineClient(client: Client){
    this.enrollment.client = client.ref
    this.clientSelected = client
  }

  // Remove enrollment client
  removeClient(){
    this.enrollment.client = undefined
    this.clientSelected = new Client()
  }

  // Calculate and add plan info to enrollment
  selectPlan(){

    if (this.idPlan != "null"){
      
      this.planSelected = this.plans.find(x=> x.id == this.idPlan);

      this.enrollment.plan = this.planSelected.ref;
      this.enrollment.initialDate = new Date();
      this.enrollment.endDate = new Date();

      switch(this.planSelected.durationType) {
        case "day":
          this.enrollment.endDate.setDate(this.enrollment.initialDate.getDate() + this.planSelected.duration);
          break;
        case "week":
          this.enrollment.endDate.setDate(this.enrollment.initialDate.getDate() + 7 * this.planSelected.duration);
          break;
        case "month":
          this.enrollment.endDate.setMonth(this.enrollment.initialDate.getMonth() + this.planSelected.duration);
          break;
        case "year":
          this.enrollment.endDate.setFullYear(this.enrollment.initialDate.getFullYear() + this.planSelected.duration);
          break;
        default:
          
      }

      this.enrollment.total = this.planSelected.cost;

    } else {

      this.enrollment.plan = null;
      this.enrollment.initialDate = null;
      this.enrollment.endDate = null;
      this.enrollment.total = null;
    }
  }

  // Save enrollment to database
  save(){
    if (this.enrollment.validate().valid){

      let newEnrollment = {
        initialDate: this.enrollment.initialDate,
        endDate: this.enrollment.endDate,
        client: this.enrollment.client,
        plan: this.enrollment.plan,
        total: this.enrollment.total
      }

      this.db.collection('enrollments').add(newEnrollment).then((result)=>{
        this.enrollment = new Enrollment();
        this.clientSelected = new Client();
        this.planSelected = new Plan();
        this.idPlan = null;
        this.msg.messageSuccess('Good Job','It saved successfully');
      })
    } else {
      this.msg.messageWarning('Warning', this.enrollment.validate().message);
    }
  }

}
