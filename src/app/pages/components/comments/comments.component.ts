import { Component, OnInit, inject } from '@angular/core';
import { ComentService } from '../../../services/coment.service';
import { ComentI } from '../../../models/coment.interface';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent{
  
  private readonly comentService = inject(ComentService);  
  protected comments: ComentI[] = [];

  constructor(){
    this.findComents();
  }
  
  isVisible = false;
  

  ngOnInit(): void {
    this.comentService.modalVisibility$.subscribe(visible => {
      this.isVisible = visible;
    });
  }

  closeModal() {
    this.comentService.hideModal();
  }

  findComents() {
    this.comentService.findComentS().subscribe(response => {
      this.comments = response;
      console.log(this.comments)
    })
  }
}
