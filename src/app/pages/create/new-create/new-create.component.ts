import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoryService } from '../../../services/story.service';
import { AuthService } from '../../../components/auth/service/auth.service';
import { StoryI } from '../../../models/story';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-create',
  templateUrl: './new-create.component.html',
  styleUrls: ['./new-create.component.scss']
})
export class NewCreateComponent {
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly storyService: StoryService = inject(StoryService);
  private readonly authService: AuthService = inject(AuthService);

  form: FormGroup;
  imageSrc: string | ArrayBuffer | null = null;
  showModal: boolean = false;

  constructor(private router: Router) {
    this.form = this.buildForm();
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      image: ['', Validators.required],
    });
  }

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
      this.form.get('image')?.setValue(file);
    }
  }

  clearImage() {
    this.imageSrc = null;
    this.form.get('image')?.setValue(null);
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onSubmit() {
    console.log('Se ha hecho clic en el botón de envío.');
    if (this.form.invalid) {
      console.log('El formulario no es válido.');
      return;
    }

    const formData = new FormData();
    const file = this.form.get('image')?.value;
    const userId = this.authService.getUserId(); // Obtener el ID del usuario logueado

    if (file) {
      formData.append('image', file);
    }
    if (userId) {
      formData.append('userId', userId);
    }

    this.storyService.createStory(formData).subscribe(
      (response: StoryI) => {
        console.log('Story created successfully:', response);
        this.closeModal(); 
      },
      (error) => {
        console.error('Error creating story:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    );
  }
}
