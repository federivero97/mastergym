import {DocumentReference} from '@angular/fire/firestore'

export class Plan{
    id: string;
    ref: DocumentReference;
    name: string;
    cost: number;
    duration: number;
}