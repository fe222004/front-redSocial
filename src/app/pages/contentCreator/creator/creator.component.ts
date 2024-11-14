import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from 'express';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.scss']
})
export class CreatorComponent  {
  private formBuilder = inject(FormBuilder);
  protected form: FormGroup;
  imageSrc: string | ArrayBuffer | null = null;  //protect user : any = NULL;
  //private readonly userService: UserService = inject(UserService);
  //protect user : any = NULL;

  //private readonly userService: UserService = inject(UserService);

  constructor(){
    this.form = this.buildForm();
   // this.findUser()
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      user: ['', [Validators.required, Validators.minLength(2)]],
      text: ['', [Validators.required, Validators.minLength(2)]],
      image: ['', Validators.required],
      tag: ['', [Validators.required]],
    });
  }

  //findUser(){
  //this.userService.findUser().suscribe((response: any) => {
  //this.user = response
  //})
  
  //createUser(playload :any){
  //this.userService.createUser().suscribe(response => {

  //})


  chooseFile() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  getFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (result) {
          this.imageSrc = result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  clearImage() {
    this.imageSrc = null;
    this.form.get('image')?.setValue(null);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.handleFile(event.dataTransfer.files[0]);
      event.dataTransfer.clearData();
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  private handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (result) {
        this.imageSrc = result;
      }
    };
    reader.readAsDataURL(file);
    this.form.get('image')?.setValue(file);
  }
}
