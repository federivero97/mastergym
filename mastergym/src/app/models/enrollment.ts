import {DocumentReference} from '@angular/fire/firestore'

export class Enrollment{
    initialDate: Date
    endDate: Date
    client: DocumentReference
    plan: DocumentReference
    total: number

    constructor(){
        this.initialDate = null
        this.endDate = null
        this.client = this.client
        this.plan = this.plan
        this.total = this.total
    }

    validate(): any {
        let response ={
            valid: false,
            message:''
        }

        if(this.client == null || this.client == undefined)
        {
            response.valid = false;
            response.message = 'Please select a client'
            return response; 
        }
        if(this.plan == null || this.plan == undefined)
        {
            response.valid = false;
            response.message = 'Please select a plan'
            return response; 
        }

        response.valid = true;
        return response;
    }
}