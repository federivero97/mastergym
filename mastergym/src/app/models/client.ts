import {DocumentReference} from '@angular/fire/firestore'

export class Client{
    id: string;
    ref: DocumentReference;
    name: string;
    lastName: string;
    birthdate: Date;
    phone: number;
    email: string;
    imgURL: string;
    visible: boolean = true;
}