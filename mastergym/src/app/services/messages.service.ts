import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor() { }


  messageSuccess(title: string, description: string){
    Swal.fire({
      title: title,
      text: description,
      icon: 'success'
    })
  }

  messageWarning(title: string, description: string){
    Swal.fire({
      title: title,
      text: description,
      icon: 'warning'
    })
  }

  messageError(title: string, description: string){
    Swal.fire({
      title: title,
      text: description,
      icon: 'error'
    })
  }
}