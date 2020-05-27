import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { MessagesService } from '../services/messages.service';
import { Plan } from '../models/plan';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {
  plans: Plan[] = new Array<Plan>();
  formPlan: FormGroup
  editeable: boolean = false
  id: string

  constructor(
    private fb:FormBuilder, 
    private db:AngularFirestore,
    private msg: MessagesService,

  ){}

  ngOnInit(): void {

    this.formPlan = this.fb.group({
      name: ['', Validators.required],
      cost: ['', Validators.required],
      duration: ['', Validators.required]
    })
    this.seePlans()
  }

  addPlan() {
    this.db.collection<Plan>('plans').add(this.formPlan.value).then(()=>{
      this.msg.messageSuccess('Good Job','The plan has been added successfully')
      this.formPlan.reset()
      this.seePlans()
    }).catch(()=>{
      this.msg.messageError('Error',"Could not add the plan")
    })
  }

  selectPlan(plan: Plan) {
    this.editeable = true
    this.formPlan.setValue({
      name: plan.name,
      cost: plan.cost,
      duration: plan.duration,
    })
    this.id = plan.id
  }

  editPlan() {
    this.db.doc('plans/' + this.id).update(this.formPlan.value).then(()=>{
      this.msg.messageSuccess('Good Job','The plan has been edited successfully')
      this.formPlan.reset()
      this.editeable = false
      this.seePlans()
    }).catch(()=>{
      this.msg.messageError('Error',"Could not edit the plan")
    }) 
  }
  
  seePlans(){
    this.db.collection<Plan>('plans').get().subscribe((items)=>{
      this.plans.length = 0
      items.docs.forEach((item)=>{
        let plan = item.data() as Plan;
        plan.id = item.id;
        plan.ref = item.ref;
        this.plans.push(plan);
      })
    });
  }

}
